export const ERRORS_HOSTNAME = 'errors.arthurdanjou.fr'
export const MAIN_HOSTNAMES = ['arthurdanjou.fr', 'www.arthurdanjou.fr']

function normalizeHost(host: string) {
  return host.split(':')[0].toLowerCase()
}

export function getCurrentHost() {
  return import.meta.server
    ? normalizeHost(useRequestURL().host)
    : normalizeHost(window.location.host)
}

export function useIsErrorsHost() {
  const host = getCurrentHost()
  return computed(() => host === ERRORS_HOSTNAME)
}
