import { queryCollection } from '@nuxt/content/server'
import { createError } from 'evlog'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'languages')
    .where('extension', '=', 'json')
    .first()

  if (!result) {
    throw createError({
      message: 'Languages not found',
      status: 404,
      why: 'The languages collection is empty or missing the expected JSON document.',
      fix: 'Add content/languages.json with a valid body payload.'
    })
  }

  const languageCount = Array.isArray(result.body) ? result.body.length : 0
  log.set({
    collection: { name: 'languages', count: languageCount }
  })

  return {
    success: true,
    data: result.body
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'languages'
})
