export default defineEventHandler(async (event) => {
  const { discord } = useRuntimeConfig(event)
  return await $fetch(`https://api.lanyard.rest/v1/users/${discord.userId}`)
})
