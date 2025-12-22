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

export const IDEs = [
  { name: 'Visual Studio Code', icon: 'i-logos:visual-studio-code' },
  { name: 'IntelliJ IDEA Ultimate', icon: 'i-logos:intellij-idea' },
  { name: 'WebStorm', icon: 'i-logos:webstorm' },
  { name: 'PyCharm Professional', icon: 'i-logos:pycharm' },
  { name: 'Cursor', icon: 'i-vscode-icons-file-type-cursorrules' }
] as const

export const socials = [
  { icon: 'i-ph-x-logo-duotone', label: 'Twitter', to: 'https://go.arthurdanjou.fr/twitter' },
  { icon: 'i-ph-github-logo-duotone', label: 'GitHub', to: 'https://go.arthurdanjou.fr/github' },
  { icon: 'i-ph-linkedin-logo-duotone', label: 'LinkedIn', to: 'https://go.arthurdanjou.fr/linkedin' },
  { icon: 'i-ph-discord-logo-duotone', label: 'Discord', to: 'https://go.arthurdanjou.fr/discord' }
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
  { label: 'stats', to: '/stats', icon: 'chart-bar-duotone' },
  { label: 'activity', to: '/activity', icon: 'activity-duotone' },
  { label: 'ecosystem', to: '/ecosystem', icon: 'graph-duotone' },
  {
    label: 'resume',
    icon: 'address-book-duotone',
    to: 'resumes/en',
    target: '_blank'
  }
] as const
