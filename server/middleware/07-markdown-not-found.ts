import { createError, getRequestURL } from 'h3'
import { LINKS_PAGE_PATH } from '~~/shared/links'

const MARKDOWN_EXTENSION = /\.md$/i
const MARKDOWN_SUFFIX_LENGTH = 3

// Routes whose markdown twin is rendered at runtime by an
// 'ai-ready:markdown:source' hook instead of the build output.
const RUNTIME_MARKDOWN_ROUTES = new Set([LINKS_PAGE_PATH])

// Every page publishes its markdown twin at build time, so Cloudflare serves it
// from the static assets before the Worker runs. A markdown request that reaches
// the Worker therefore targets a page that does not exist. Answer 404 here:
// nuxt-ai-ready would otherwise fetch the HTML twin from the same Worker, which
// never resolves in production and leaves the request hanging.
export default defineEventHandler((event) => {
  if (import.meta.dev || import.meta.prerender) return

  const { pathname } = getRequestURL(event)
  if (!MARKDOWN_EXTENSION.test(pathname)) return

  const route = pathname.slice(0, -MARKDOWN_SUFFIX_LENGTH)
  if (RUNTIME_MARKDOWN_ROUTES.has(route)) return

  throw createError({ statusCode: 404, statusMessage: 'Page not found.' })
})
