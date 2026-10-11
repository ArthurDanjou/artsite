export default defineNuxtPlugin({
  name: 'scroll-to-top-on-view-transition',
  order: -1,
  setup(nuxtApp) {
    const router = useRouter()
    let activeTransitions = 0
    let isBackNavigation = false

    window.addEventListener('popstate', () => {
      isBackNavigation = true
    })

    nuxtApp.hook('page:view-transition:start', (transition) => {
      activeTransitions++
      transition.finished.catch(() => {}).finally(() => {
        activeTransitions--
      })
    })

    nuxtApp.hook('page:finish', () => {
      const { hash, meta } = router.currentRoute.value
      if (activeTransitions > 0 && !isBackNavigation && !hash && meta.scrollToTop !== false) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
      isBackNavigation = false
    })
  }
})
