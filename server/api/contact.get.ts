import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'contact')
    .where('extension', '=', 'json')
    .first()

  if (!result) {
    throw createError({ statusCode: 404, statusMessage: 'Contact information not found' })
  }

  log.set({ contact: { found: true } })
  return result.body
}, {
  maxAge: 60 * 60 * 24,
  name: 'contact'
})
