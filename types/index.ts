interface WakatimeData {
  name: string
  percent: number
}

export interface Stats {
  coding: {
    grand_total: {
      total_seconds_including_other_language: number
    }
    range: {
      start: string
    }
  }
  editors: WakatimeData[]
  os: WakatimeData[]
  languages: WakatimeData[]
}

interface LanyardActivity {
  name: string
  state: string
  details: string
  timestamps: {
    start: number
  }
  assets?: {
    small_text: string
  }
}

export interface Activity {
  data: {
    activities: LanyardActivity[]
  }
}

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
  // ... autres champs optionnels (dateRange, etc.)
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

export const IDEs = [
  { name: 'Visual Studio Code', icon: 'i-logos:visual-studio-code' },
  { name: 'IntelliJ IDEA Ultimate', icon: 'i-logos:intellij-idea' },
  { name: 'WebStorm', icon: 'i-logos:webstorm' },
  { name: 'PyCharm Professional', icon: 'i-logos:pycharm' },
  { name: 'Cursor', icon: 'i-vscode-icons-file-type-cursorrules' },
  { name: 'Positron', icon: 'i-devicon-positron' }
] as const

interface Nav {
  label: string
  to: string
  icon?: string
  target?: string
}

export const navs: readonly Nav[] = [
  { label: 'home', to: '/', icon: 'house-duotone' },
  { label: 'uses', to: '/uses', icon: 'tree-evergreen-duotone' },
  { label: 'projects', to: '/projects', icon: 'folder-duotone' },
  { label: 'hobbies', to: '/hobbies', icon: 'game-controller-duotone' },
  { label: 'ecosystem', to: '/ecosystem', icon: 'graph-duotone' },
  {
    label: 'resume',
    icon: 'address-book-duotone',
    to: 'resumes/en',
    target: '_blank'
  }
] as const
