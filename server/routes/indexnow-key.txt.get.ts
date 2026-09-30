export default defineEventHandler((event) => {
  const { indexNowKey } = useRuntimeConfig(event)

  if (!indexNowKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'IndexNow key is not configured.'
    })
  }

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return indexNowKey
})
