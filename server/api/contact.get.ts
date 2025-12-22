import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'contact')
    .where('extension', '=', 'json')
    .first()

  console.log(await queryCollection(event, 'contact').all())

  if (!result) {
    throw createError({ statusCode: 404, statusMessage: 'Contact information not found' })
  }

  return result.body
}, {
  maxAge: 60 * 60 * 24,
  name: 'contact'
})
