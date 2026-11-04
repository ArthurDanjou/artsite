import { defineEventHandler, getQuery, sendRedirect, setHeader } from 'h3'

const ERRORS_HOSTNAME = 'errors.arthurdanjou.fr'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const parsedCode = Number.parseInt(String(query.code ?? ''), 10)
  const code = parsedCode >= 400 && parsedCode <= 599 ? parsedCode : 503

  let host = ''
  let path = '/'

  if (typeof query.url === 'string') {
    try {
      const original = new URL(query.url)
      host = original.host
      path = `${original.pathname}${original.search}`
    }
    catch {
      // Ignore malformed URLs and fall back to the generic error page.
    }
  }

  const target = new URL(`https://${ERRORS_HOSTNAME}/errors`)
  target.searchParams.set('code', String(code))
  if (host) {
    target.searchParams.set('service', host)
  }
  target.searchParams.set('path', path)

  setHeader(event, 'Cache-Control', 'no-store')
  return sendRedirect(event, target.toString(), 302)
})
