import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'experiences')
    .where('extension', '=', 'md')
    .order('startDate', 'DESC')
    .all()

  if (result.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Experience records not found' })
  }

  return result
},
{
  maxAge: 60 * 60 * 24,
  name: 'experiences'
})
