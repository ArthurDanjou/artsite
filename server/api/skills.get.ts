import { queryCollection } from '@nuxt/content/server'
import { createError } from 'evlog'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'skills')
    .where('extension', '=', 'json')
    .first()

  if (!result) {
    throw createError({
      message: 'Skills not found',
      status: 404,
      why: 'The skills collection is empty or missing the expected JSON document.',
      fix: 'Add content/skills.json with a valid body payload.'
    })
  }

  const skillCount = Array.isArray(result.body) ? result.body.length : 0
  log.set({
    collection: { name: 'skills', count: skillCount }
  })

  return {
    success: true,
    data: result.body
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'skills'
})
