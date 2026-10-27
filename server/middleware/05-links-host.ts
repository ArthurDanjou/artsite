import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { createError, getRequestURL, sendRedirect, setHeader } from 'h3'
import { isShortHost, normalizeSlug, RESERVED_SLUGS } from '~~/shared/links'
import { getRequestHostname } from '../utils/request-host'
import { trackLinkClick } from '../utils/links'

const PASSTHROUGH_PREFIXES = [
  '/.well-known/',
  '/__ai-ready',
  '/__nuxt',
  '/__skew',
  '/_ipx/',
  '/_nuxt/',
  '/_openapi.json',
  '/api/',
  '/assets/',
  '/errors',
  '/mcp',
  '/qr/',
  '/studio'
]

const PASSTHROUGH_FILES = new Set([
  '/favicon.ico',
  '/llms.txt',
  '/robots.txt',
  '/sitemap.xml'
])

function isPassthrough(pathname: string): boolean {
  if (PASSTHROUGH_FILES.has(pathname)) return true
  if (PASSTHROUGH_PREFIXES.some(prefix => pathname.startsWith(prefix))) return true
  return /\.[a-z0-9]+$/i.test(pathname)
}

export default defineEventHandler(async (event) => {
  const hostname = getRequestHostname(event)
  if (!isShortHost(hostname)) return

  const { pathname } = getRequestURL(event)
  if (isPassthrough(pathname)) return

  setHeader(event, 'X-Robots-Tag', 'noindex, follow')

  if (pathname === '/') {
    setHeader(event, 'Cache-Control', 'no-store')
    return sendRedirect(event, '/links', 302)
  }

  if (pathname === '/links' || pathname.startsWith('/links/')) return

  const slug = normalizeSlug(decodeURIComponent(pathname))
  if (!slug || slug.includes('/') || RESERVED_SLUGS.has(slug)) {
    throw createError({ statusCode: 404, statusMessage: 'Link not found.' })
  }

  const link = await queryCollection(event, 'links')
    .where('slug', '=', slug)
    .first()

  if (!link || link.archived) {
    throw createError({ statusCode: 404, statusMessage: 'Link not found.' })
  }

  const tracking = trackLinkClick(event, slug)
  const waitUntil = (event as H3Event & { waitUntil?: (promise: Promise<unknown>) => void }).waitUntil
  if (waitUntil) {
    waitUntil(tracking)
  }
  else {
    await tracking
  }

  setHeader(event, 'Cache-Control', 'no-store')
  return sendRedirect(event, link.url, 302)
})
