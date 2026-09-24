export default defineNuxtRouteMiddleware((to) => {
  // Blocked on the main domains in production so the page stays
  // unreachable by normal browsing. Previewed locally with import.meta.dev.
  if (to.path === '/errors' && MAIN_HOSTNAMES.includes(getCurrentHost()) && !import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })
  }

  // On errors.arthurdanjou.fr every path renders the fallback page,
  // preserving the Traefik ?code={status} query string.
  if (getCurrentHost() === ERRORS_HOSTNAME && to.path !== '/errors') {
    return navigateTo({ path: '/errors', query: to.query, hash: to.hash }, { redirectCode: 302 })
  }
})
