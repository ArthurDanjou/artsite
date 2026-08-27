interface HaState {
  entity_id: string
  state: string
  attributes: Record<string, unknown>
}

function toStringOrNull(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v.trim() : null
}

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.ha.url || !config.ha.token) {
    return { updatedAt: new Date().toISOString(), players: [], nowPlaying: null }
  }

  const headers = { Authorization: `Bearer ${config.ha.token}` }
  const base = config.ha.url.replace(/\/$/, '')

  let states: HaState[]
  try {
    states = await $fetch<HaState[]>(`${base}/api/states`, { headers, timeout: 5000 })
  }
  catch {
    return { updatedAt: new Date().toISOString(), players: [], nowPlaying: null }
  }

  const mediaStates = states.filter(s => s.entity_id.startsWith('media_player.'))

  const players = mediaStates.map((s) => {
    const a = s.attributes
    const rawArtwork = toStringOrNull(a.entity_picture)
    // Keep raw path; frontend will use proxy endpoint for auth.
    // Also provide absolute fallback for public HA.
    let artwork: string | null = null
    if (rawArtwork) {
      if (rawArtwork.startsWith('http')) artwork = rawArtwork
      else if (rawArtwork.startsWith('/')) artwork = `/api/ha/media-cover?entity_id=${encodeURIComponent(s.entity_id)}`
      else artwork = rawArtwork
    }

    return {
      entity_id: s.entity_id,
      state: s.state,
      friendly_name: toStringOrNull(a.friendly_name) ?? s.entity_id,
      title: toStringOrNull(a.media_title),
      artist: toStringOrNull(a.media_artist),
      album: toStringOrNull(a.media_album_name),
      artwork,
      content_type: toStringOrNull(a.media_content_type),
      app_name: toStringOrNull(a.app_name),
      source: toStringOrNull(a.source)
    }
  })

  // Prioritise Music Assistant players that are playing with a title
  const isMA = (p: typeof players[number]) =>
    p.app_name?.toLowerCase().includes('music assistant')
    || p.entity_id.toLowerCase().includes('mass')
    || p.entity_id.toLowerCase().includes('music_assistant')

  const playing = players.filter(p => p.state === 'playing' && p.title)

  let nowPlaying: typeof players[number] | null = null
  if (playing.length) {
    const maPlaying = playing.filter(isMA)
    nowPlaying = (maPlaying.length ? maPlaying[0] : playing[0]) ?? null
  }

  // If nothing playing but something paused with metadata, keep null (idle handled in UI)
  // Return also non-playing players for debugging, but limit to those with some metadata or active
  const relevantPlayers = players.filter(p =>
    p.state === 'playing' || p.state === 'paused' || p.title || isMA(p)
  )

  return {
    updatedAt: new Date().toISOString(),
    players: relevantPlayers,
    nowPlaying
  }
}, {
  maxAge: 15,
  name: 'ha-media'
})
