// Nuxt Studio's production host calls requestRerender() when it mounts. On an
// error page this clears the 404 and navigates to the same URL with a
// cache-busting ?t= query. The URL still matches no page, so the default
// layout is rendered without content. Restore the 404 once the navigation has
// settled and drop the timestamp from the address bar.
export default defineNuxtPlugin((nuxtApp) => {
  let clearedWithTimestamp = false

  nuxtApp.hook('app:error:cleared', (options) => {
    clearedWithTimestamp = !!options?.redirect?.startsWith('?t=')
  })

  nuxtApp.$router.afterEach((to) => {
    if (!clearedWithTimestamp) return
    clearedWithTimestamp = false

    if (to.matched.length > 0) return

    window.setTimeout(() => {
      if (nuxtApp.payload.error) return
      if (nuxtApp.$router.currentRoute.value.path !== to.path) return

      window.history.replaceState(window.history.state, '', to.path)
      nuxtApp.runWithContext(() => {
        showError(createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true }))
      })
    }, 0)
  })
})
