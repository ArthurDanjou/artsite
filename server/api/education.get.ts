import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  const result = await queryCollection(event, 'education')
    .where('extension', '=', 'md')
    .order('startDate', 'DESC')
    .all()

  if (result.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Education records not found' })
  }

  log.set({ education: { count: result.length } })
  return result
}, {
  maxAge: 60 * 60 * 24,
  name: 'education'
})
