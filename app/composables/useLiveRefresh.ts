export function useLiveRefresh(refresh: () => void, intervalMs: number) {
  const visibility = useDocumentVisibility()
  const { pause, resume } = useIntervalFn(refresh, intervalMs)

  watch(visibility, (state) => {
    if (state === 'visible') {
      refresh()
      resume()
    }
    else {
      pause()
    }
  })
}
