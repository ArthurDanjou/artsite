import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'projects')
    .where('extension', '=', 'md')
    .all()

  if (result.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Projects not found' })
  }

  log.set({ projects: { count: result.length } })
  return result
}, {
  maxAge: 60 * 60 * 24,
  name: 'projects'
})
