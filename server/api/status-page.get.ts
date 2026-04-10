export default defineCachedEventHandler(async (event) => {
  const { statusPage } = useRuntimeConfig(event)
  return await $fetch(statusPage)
}, {
  maxAge: 60 * 60 * 3, // 3 hours
  name: 'status-page'
})
