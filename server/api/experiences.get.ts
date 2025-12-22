import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const result = await queryCollection(event, 'experiences')
    .where('extension', '=', 'md')
    .all()

  if (result.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Experience records not found' })
  }

  return result
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .map(exp => ({
      title: exp.title,
      company: exp.company,
      companyUrl: exp.companyUrl,
      startDate: exp.startDate,
      endDate: exp.endDate,
      location: exp.location,
      description: exp.description
    }))
},
{
  maxAge: 60 * 60 * 24,
  name: 'experiences'
})
