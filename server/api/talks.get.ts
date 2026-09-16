import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'talks')
    .where('extension', '=', 'json')
    .first()

  if (!result) {
    throw createError({ statusCode: 404, statusMessage: 'Talks not found' })
  }

  return result.body
}, {
  maxAge: 60 * 60 * 24,
  name: 'talks'
})
