// @ts-expect-error alias module
import { serverQueryContent } from '#content/server'

export default defineEventHandler((event) => {
  return serverQueryContent(event).find()
})
