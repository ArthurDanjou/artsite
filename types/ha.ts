export interface HAStatus {
  weather?: { condition: string, temperature: number }
  isHoliday?: boolean
  totalLights?: number
  totalAutomations?: number
  totalScenes?: number
  totalDomains?: number
  totalEntities?: number
  immichPhotos?: number
  immichVideos?: number
  lxcContainers?: number
  virtualMachines?: number
  dnsRequests?: number
  dnsBlocked?: number
  totalMediaPlayers?: number
  activeMediaPlayers?: number
}

export interface StatsCard {
  label: string
  value: string
  icon: string
  color: string
}

export interface HAMediaPlayer {
  entity_id: string
  state: string
  friendly_name: string
  title: string | null
  artist: string | null
  album: string | null
  artwork: string | null
  content_type: string | null
  app_name: string | null
  source: string | null
}

export interface HAMediaResponse {
  updatedAt: string
  players: HAMediaPlayer[]
  nowPlaying: HAMediaPlayer | null
}
