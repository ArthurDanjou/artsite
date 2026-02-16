import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'skills')
    .where('extension', '=', 'json')
    .first()

  if (!result) {
    throw createError({ statusCode: 404, statusMessage: 'Skills not found' })
  }

  log.set({ skills: { found: true } })
  return result.body
}, {
  maxAge: 60 * 60 * 24,
  name: 'skills'
})
