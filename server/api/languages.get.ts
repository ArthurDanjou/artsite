import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'languages')
    .where('extension', '=', 'json')
    .first()

  if (!result) {
    throw createError({ statusCode: 404, statusMessage: 'Languages not found' })
  }

  return result.body
}, {
  maxAge: 60 * 60 * 24,
  name: 'languages'
})
