import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'hobbies')
    .where('extension', '=', 'md')
    .first()
  if (!result) {
    throw createError({ statusCode: 404, statusMessage: 'Hobbies not found' })
  }

  return result.body
}, {
  maxAge: 60 * 60 * 24,
  name: 'hobbies'
})
