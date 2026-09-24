// Mirrors app/middleware/errors-guard.global.ts on the server so the gating
// also applies to SSR, curl, and non-JS clients. Host literals are duplicated
// here on purpose to keep the server bundle free of app imports.
const ERRORS_HOSTNAME = 'errors.arthurdanjou.fr'
const CANONICAL_HOSTNAME = 'arthurdanjou.fr'

const PASSTHROUGH_PREFIXES = ['/api/', '/_nuxt/', '/_ipx/', '/__nuxt', '/.well-known/']

function isAsset(pathname: string) {
  if (pathname === '/favicon.ico') return true
  if (PASSTHROUGH_PREFIXES.some(prefix => pathname.startsWith(prefix))) return true
  return /\.[a-z0-9]+$/i.test(pathname)
}

export default defineEventHandler((event) => {
  const host = (getRequestHost(event) || '').split(':')[0].toLowerCase()
  const { pathname, search } = getRequestURL(event)
  const isErrorsHost = host === ERRORS_HOSTNAME

  if (isErrorsHost) {
    setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  }

  // Canonical domain: www -> root (replaces the @nuxtjs/seo canonical redirect,
  // disabled so it does not 301 the errors subdomain). Assets keep serving
  // directly, like the module did.
  if (host === 'www.arthurdanjou.fr' && !isAsset(pathname)) {
    return sendRedirect(event, `https://${CANONICAL_HOSTNAME}${pathname}${search}`, 301)
  }

  // The /errors page is served on every host with HTTP 200 (the error
  // code lives in the query and the rendered content, never in the
  // status): the Traefik errors middleware replays the original status
  // itself, and a throw here would break its fallback chain.
  if (isErrorsHost && pathname !== '/errors' && !isAsset(pathname)) {
    return sendRedirect(event, `/errors${search}`, 302)
  }
})
