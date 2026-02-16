import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'languages')
    .where('extension', '=', 'json')
    .first()

  if (!result) {
    throw createError({ statusCode: 404, statusMessage: 'Languages not found' })
  }

  log.set({ languages: { found: true } })
  return result.body
}, {
  maxAge: 60 * 60 * 24,
  name: 'languages'
})
