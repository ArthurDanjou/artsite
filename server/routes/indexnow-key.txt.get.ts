import { createError, defineEventHandler, useRuntimeConfig } from 'nuxt/server'

export default defineEventHandler((event) => {
  const { indexNowKey } = useRuntimeConfig()

  if (!indexNowKey) {
    throw createError({
      status: 500,
      statusText: 'IndexNow key is not configured.'
    })
  }

  event.res.headers.set('Content-Type', 'text/plain; charset=utf-8')
  return indexNowKey
})
