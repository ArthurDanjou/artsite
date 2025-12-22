import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'profile')
    .where('extension', '=', 'md')
    .first()

  if (!result) {
    throw createError({ statusCode: 404, statusMessage: 'Profile not found' })
  }

  return result
}, {
  maxAge: 60 * 60 * 24,
  name: 'profile'
})
