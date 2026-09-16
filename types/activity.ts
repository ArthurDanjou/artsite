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
  { name: 'Cursor', icon: 'i-vscode-icons-file-type-cursorrules' },
  { name: 'Positron', icon: 'i-devicon-positron' },
  { name: 'Zed', icon: 'i-simple-icons:zedindustries' }
] as const
