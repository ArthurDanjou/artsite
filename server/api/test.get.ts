import { prefixStorage } from "unstorage"

export default defineEventHandler((event) => {
  return prefixStorage(useStorage(), 'cache:content:parsed')
})
