export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.ha.url || !config.ha.token) {
    return null
  }

  const headers = { Authorization: `Bearer ${config.ha.token}` }
  const entityIds = [
    'media_player.sonos_tv',
    'media_player.ma_sonos',
    'media_player.apple_tv_arthur',
    'media_player.panasonic_tv',
    'media_player.playstation_5',
    'media_player.lecteurs_multi_media'
  ]

  const results = await Promise.allSettled(
    entityIds.map(id =>
      $fetch(`${config.ha.url}/api/states/${id}`, { headers })
        .then(r => ({ entity_id: id, state: r.state, attributes: r.attributes }))
        .catch(() => null)
    )
  )

  const players = []
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value) players.push(r.value)
  }

  return { updatedAt: new Date().toISOString(), players }
}, {
  maxAge: 30,
  name: 'ha-media'
})
