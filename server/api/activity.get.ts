export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  const { discord } = useRuntimeConfig(event)
  log.set({ source: 'lanyard' })
  return await $fetch(`https://api.lanyard.rest/v1/users/${discord.userId}`)
})
