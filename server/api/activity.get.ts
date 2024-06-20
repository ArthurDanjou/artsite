export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  return await $fetch(`https://api.lanyard.rest/v1/users/${config.discordUserId}`)
})
