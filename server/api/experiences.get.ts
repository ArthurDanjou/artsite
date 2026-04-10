import { queryCollection } from '@nuxt/content/server'
import { createError } from 'evlog'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'experiences')
    .where('extension', '=', 'md')
    .order('startDate', 'DESC')
    .all()

  if (result.length === 0) {
    throw createError({
      message: 'Experience records not found',
      status: 404,
      why: 'No markdown documents were found in the experiences collection.',
      fix: 'Add at least one file under content/experiences with valid front matter.'
    })
  }

  log.set({
    collection: { name: 'experiences', count: result.length }
  })

  return {
    success: true,
    data: result
  }
},
{
  maxAge: 60 * 60 * 24,
  name: 'experiences'
})
