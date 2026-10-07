import { defineUseFetchAddon } from 'nuxt/app'

const livePolling = defineUseFetchAddon<{ pollInterval?: number }>({
  setup: (options) => {
    if (import.meta.server || !options.pollInterval) {
      return
    }
    const intervalMs = options.pollInterval
    return (asyncData) => {
      const visibility = useDocumentVisibility()
      const { pause, resume } = useIntervalFn(() => asyncData.refresh(), intervalMs)
      watch(visibility, (state) => {
        if (state === 'visible') {
          asyncData.refresh()
          resume()
        }
        else {
          pause()
        }
      })
    }
  }
})

export const useLiveFetch = createUseFetch({ addons: [livePolling] })
