export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const { statusPage } = useRuntimeConfig(event)
  log.set({ source: 'status-page' })
  return await $fetch(statusPage)
}, {
  maxAge: 60,
  name: 'status-page'
})
