import { getRequestHeader, getRequestHost, getRequestURL, getResponseStatus } from 'h3'

const ERRORS_HOSTNAME = 'errors.arthurdanjou.fr'
const MAIN_HOSTNAMES = new Set(['arthurdanjou.fr'])

const PASSTHROUGH_PREFIXES = ['/api/', '/_nuxt/', '/_ipx/', '/__nuxt', '/.well-known/']
const PASSTHROUGH_PATHS = new Set(['/errors', '/redirect', '/studio', '/mcp', '/qr'])

function isAsset(pathname: string) {
  if (pathname === '/favicon.ico') return true
  if (PASSTHROUGH_PREFIXES.some(prefix => pathname.startsWith(prefix))) return true
  return /\.[a-z0-9]+$/i.test(pathname)
}

// Redirect HTML 404s from the main site to the branded error page. Nuxt renders
// the error through the internal /__nuxt_error route, so this is the only place
// where the original path and the final status are both available. API routes,
// assets and alternate representations never reach this route and keep their
// native 404.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    const url = getRequestURL(event)
    if (url.pathname !== '/__nuxt_error') return
    if (url.searchParams.get('statusCode') !== '404') return
    if ((response.statusCode ?? getResponseStatus(event)) !== 200) return

    const host = getRequestHost(event).split(':')[0]?.toLowerCase() ?? ''
    if (!MAIN_HOSTNAMES.has(host)) return

    const accept = getRequestHeader(event, 'accept') ?? ''
    if (!accept.includes('text/html')) return

    const original = url.searchParams.get('url') || '/'
    const originalURL = new URL(original, `https://${host}`)
    if (isAsset(originalURL.pathname) || PASSTHROUGH_PATHS.has(originalURL.pathname)) return

    const target = new URL(`https://${ERRORS_HOSTNAME}/errors`)
    target.searchParams.set('code', '404')
    target.searchParams.set('path', `${originalURL.pathname}${originalURL.search}`)

    response.statusCode = 302
    response.statusMessage = 'Found'
    response.headers = {
      ...response.headers,
      'cache-control': 'no-store',
      'location': target.toString()
    }
    response.body = ''
  })
})
