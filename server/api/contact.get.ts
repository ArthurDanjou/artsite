import { queryCollection } from '@nuxt/content/server'
import { createError } from 'evlog'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'contact')
    .where('extension', '=', 'json')
    .first()

  if (!result) {
    throw createError({
      message: 'Contact information not found',
      status: 404,
      why: 'The contact collection is empty or missing the expected JSON document.',
      fix: 'Add content/contact.json with a valid body payload.'
    })
  }

  log.set({
    collection: { name: 'contact', found: true }
  })

  return {
    success: true,
    data: result.body
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'contact'
})
