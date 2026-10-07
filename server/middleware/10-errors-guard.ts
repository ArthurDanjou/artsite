import { defineEventHandler, getRequestHost, getRequestURL, sendRedirect } from 'nuxt/server'

const ERRORS_HOSTNAME = 'errors.arthurdanjou.fr'
const CANONICAL_HOSTNAME = 'arthurdanjou.fr'

const PASSTHROUGH_PREFIXES = ['/api/', '/_nuxt/', '/_ipx/', '/__nuxt', '/.well-known/']

function isAsset(pathname: string) {
  if (pathname === '/favicon.ico') return true
  if (PASSTHROUGH_PREFIXES.some(prefix => pathname.startsWith(prefix))) return true
  return /\.[a-z0-9]+$/i.test(pathname)
}

export default defineEventHandler((event) => {
  const host = getRequestHost(event).split(':')[0]?.toLowerCase() ?? ''
  const { pathname, search } = getRequestURL(event)
  const isErrorsHost = host === ERRORS_HOSTNAME

  if (isErrorsHost) {
    event.res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  if (host === 'www.arthurdanjou.fr' && !isAsset(pathname)) {
    return sendRedirect(event, `https://${CANONICAL_HOSTNAME}${pathname}${search}`, 301)
  }

  if (isErrorsHost && pathname !== '/errors' && !isAsset(pathname)) {
    return sendRedirect(event, `/errors${search}`, 302)
  }
})
