export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.ha.url || !config.ha.token) {
    throw createError({ statusCode: 503, message: 'HA not configured' })
  }

  const query = getQuery(event)
  const entityId = typeof query.entity_id === 'string' ? query.entity_id : null
  if (!entityId || !entityId.startsWith('media_player.')) {
    throw createError({ statusCode: 400, message: 'Invalid entity_id' })
  }

  const headers = { Authorization: `Bearer ${config.ha.token}` }
  const base = config.ha.url.replace(/\/$/, '')

  // Fetch entity to get fresh entity_picture path
  const state = await $fetch<{ attributes: Record<string, unknown> }>(
    `${base}/api/states/${entityId}`,
    { headers }
  ).catch(() => null)

  const pic = state?.attributes?.entity_picture
  if (typeof pic !== 'string' || !pic) {
    throw createError({ statusCode: 404, message: 'No artwork' })
  }

  // HA returns relative path like /api/media_player_proxy/...
  const url = pic.startsWith('http') ? pic : `${base}${pic}`

  // Proxy the image with auth
  const res = await fetch(url, { headers })
  if (!res.ok || !res.body) {
    throw createError({ statusCode: res.status || 404, message: 'Artwork fetch failed' })
  }

  const contentType = res.headers.get('content-type') || 'image/jpeg'
  setHeader(event, 'content-type', contentType)
  setHeader(event, 'cache-control', 'public, max-age=60, stale-while-revalidate=30')
  // Allow frontend to cache aggressively
  return sendStream(event, res.body as unknown as ReadableStream)
})
