export default defineNuxtRouteMiddleware((to) => {
  // /errors renders on every host with HTTP 200 (see server middleware):
  // no gating here, the error code lives in the query and the content.

  // On errors.arthurdanjou.fr every path renders the fallback page,
  // preserving the Traefik ?code={status} query string.
  if (getCurrentHost() === ERRORS_HOSTNAME && to.path !== '/errors') {
    return navigateTo({ path: '/errors', query: to.query, hash: to.hash }, { redirectCode: 302 })
  }
})
