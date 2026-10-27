import { isShortHost } from '~~/shared/links'
import { getRequestHostname } from '../utils/request-host'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    const hostname = getRequestHostname(event)
    if (!isShortHost(hostname)) return

    response.headers = {
      ...(response.headers ?? {}),
      'X-Robots-Tag': 'noindex, follow'
    }
  })
})
