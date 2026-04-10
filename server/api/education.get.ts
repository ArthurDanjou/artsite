import { queryCollection } from '@nuxt/content/server'
import { createError } from 'evlog'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'education')
    .where('extension', '=', 'md')
    .order('startDate', 'DESC')
    .all()

  if (result.length === 0) {
    throw createError({
      message: 'Education records not found',
      status: 404,
      why: 'No markdown documents were found in the education collection.',
      fix: 'Add at least one file under content/education with valid front matter.'
    })
  }

  log.set({
    collection: { name: 'education', count: result.length }
  })

  return {
    success: true,
    data: result
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'education'
})
