import type { BadgeColor } from '#ui/types'

interface WakatimeData {
  name: string
  percent: number
}

export interface Stats {
  coding: {
    data: {
      grand_total: {
        total_seconds_including_other_language: number
      }
      range: {
        start: string
      }
    }
  }
  editors: {
    data: Array<WakatimeData>
  }
  os: {
    data: Array<WakatimeData>
  }
  languages: {
    data: Array<WakatimeData>
  }
}

interface LanyardActivity {
  name: string
  state: string
  details: string
  timestamps: {
    start: number
  }
}

export interface Activity {
  data: {
    activities: Array<LanyardActivity>
  }
}

export const IDEs = [
  { name: 'Visual Studio Code', icon: 'visual-studio-code' },
  { name: 'IntelliJ IDEA Ultimate', icon: 'intellij-idea' },
  { name: 'WebStorm', icon: 'webstorm' },
]

export interface Tag {
  label: string
  icon: string
  color: BadgeColor
}

export const TAGS: Array<Tag> = [
  {
    label: 'Article',
    icon: 'i-ph-pencil-line-duotone',
    color: 'red',
  },
  {
    label: 'Project',
    icon: 'i-ph-briefcase-duotone',
    color: 'blue',
  },
  {
    label: 'R',
    icon: 'i-vscode-icons-file-type-r',
    color: 'orange',
  },
  {
    label: 'ML',
    icon: 'i-ph-brain-duotone',
    color: 'green',
  },
  {
    label: 'Data',
    icon: 'i-ph-database-duotone',
    color: 'purple',
  },
  {
    label: 'Web',
    icon: 'i-ph-globe-duotone',
    color: 'cyan',
  },
  {
    label: 'Python',
    icon: 'i-vscode-icons-file-type-python',
    color: 'amber',
  },
  {
    label: 'Maths',
    icon: 'i-ph-calculator-duotone',
    color: 'rose',
  },
]
