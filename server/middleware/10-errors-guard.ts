// Mirrors app/middleware/errors-guard.global.ts on the server so the gating
// also applies to SSR, curl, and non-JS clients. Host literals are duplicated
// here on purpose to keep the server bundle free of app imports.
const ERRORS_HOSTNAME = 'errors.arthurdanjou.fr'
const MAIN_HOSTNAMES = ['arthurdanjou.fr', 'www.arthurdanjou.fr']

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
  const isMainHost = MAIN_HOSTNAMES.includes(host)

  if (isErrorsHost) {
    setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  }

  if (pathname === '/errors' && isMainHost) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  if (isErrorsHost && pathname !== '/errors' && !isAsset(pathname)) {
    return sendRedirect(event, `/errors${search}`, 302)
  }
})
