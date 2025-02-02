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
  color: string
  title?: string
  translation: string
}

export const TAGS: Array<Tag> = [
  {
    label: 'Article',
    icon: 'i-ph-pencil-line-duotone',
    color: 'red',
    title: 'Articles',
    translation: 'tags.article',
  },
  {
    label: 'Project',
    icon: 'i-ph-briefcase-duotone',
    color: 'blue',
    title: 'Projects',
    translation: 'tags.project',
  },
  {
    label: 'R',
    icon: 'i-vscode-icons-file-type-r',
    color: 'orange',
    translation: 'tags.r',
  },
  {
    label: 'AI',
    icon: 'i-ph-brain-duotone',
    color: 'green',
    translation: 'tags.ai',
  },
  {
    label: 'Data',
    icon: 'i-ph-database-duotone',
    color: 'purple',
    translation: 'tags.data',
  },
  {
    label: 'Web',
    icon: 'i-ph-globe-duotone',
    color: 'cyan',
    translation: 'tags.web',
  },
  {
    label: 'Python',
    icon: 'i-vscode-icons-file-type-python',
    color: 'amber',
    translation: 'tags.python',
  },
  {
    label: 'Maths',
    icon: 'i-ph-calculator-duotone',
    color: 'pink',
    translation: 'tags.maths',
  },
]
