export function useTimelineOrientation() {
  const { width } = useWindowSize()
  return computed<'vertical' | 'horizontal'>(() =>
    width.value >= 768 ? 'horizontal' : 'vertical'
  )
}
