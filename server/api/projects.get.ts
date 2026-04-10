import { queryCollection } from '@nuxt/content/server'
import { createError } from 'evlog'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'projects')
    .where('extension', '=', 'md')
    .all()

  if (result.length === 0) {
    throw createError({
      message: 'Projects not found',
      status: 404,
      why: 'No markdown documents were found in the projects collection.',
      fix: 'Add at least one file under content/projects with valid front matter.'
    })
  }

  log.set({
    collection: { name: 'projects', count: result.length }
  })

  return {
    success: true,
    data: result
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'projects'
})
