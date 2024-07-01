import { prefixStorage } from 'unstorage'

export default defineEventHandler((event) => {
  return prefixStorage(useStorage(), 'content:source').getKeys()
})
