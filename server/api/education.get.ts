import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'education')
    .where('extension', '=', 'md')
    .all()

  if (result.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Education records not found' })
  }

  return result
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      startDate: edu.startDate,
      endDate: edu.endDate,
      location: edu.location
    }))
}, {
  maxAge: 60 * 60 * 24,
  name: 'education'
})
