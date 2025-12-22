import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'projects')
    .where('extension', '=', 'md')
    .all()

  if (result.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Projects not found' })
  }

  return result
}, {
  maxAge: 60 * 60 * 24,
  name: 'projects'
})
