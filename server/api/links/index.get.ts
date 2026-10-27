import { getPublicLinks } from '../../utils/links'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300')
  return await getPublicLinks()
})
