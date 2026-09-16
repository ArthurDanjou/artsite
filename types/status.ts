export interface StatusTag {
  id: number
  monitor_id: number
  tag_id: number
  value: string
  name: string
  color: string
}

export interface StatusMonitor {
  id: number
  name: string
  sendUrl: number
  type: string
  url?: string
  tags: StatusTag[]
}

export interface StatusGroup {
  id: number
  name: string
  weight: number
  monitorList: StatusMonitor[]
}

export interface StatusMaintenance {
  id: number
  title: string
  description: string
  strategy: string
  active: boolean
  status: string // 'under-maintenance', etc.
}

export interface StatusConfig {
  slug: string
  title: string
  description: string
  icon: string
  autoRefreshInterval: number
  theme: string
  published: boolean
  showTags: boolean
  customCSS: string
  footerText: string
  showPoweredBy: boolean
}

export interface StatusPageData {
  config: StatusConfig
  incident: unknown | null
  publicGroupList: StatusGroup[]
  maintenanceList: StatusMaintenance[]
}
