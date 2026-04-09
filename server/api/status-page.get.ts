export default defineCachedEventHandler(async (event) => {
  const { statusPage } = useRuntimeConfig(event)
  return await $fetch(statusPage)
}, {
  maxAge: 60 * 60, // 1 hour
  name: 'status-page'
})
