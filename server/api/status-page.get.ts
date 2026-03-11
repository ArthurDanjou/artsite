export default defineCachedEventHandler(async (event) => {
  const { statusPage } = useRuntimeConfig(event)
  console.log('Fetching status page data...', statusPage)
  return await $fetch(statusPage)
}, {
  maxAge: 60,
  name: 'status-page'
})
