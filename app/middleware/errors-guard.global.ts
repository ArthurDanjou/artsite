export default defineNuxtRouteMiddleware((to) => {
  if (getCurrentHost() === ERRORS_HOSTNAME && to.path !== '/errors') {
    return navigateTo({ path: '/errors', query: to.query, hash: to.hash }, { redirectCode: 302 })
  }
})
