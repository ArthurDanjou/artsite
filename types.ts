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
  { name: 'Visual Studio Code', icon: 'i-logos-visual-studio-code' },
  { name: 'IntelliJ IDEA Ultimate', icon: 'i-logos-intellij-idea' },
  { name: 'WebStorm', icon: 'i-logos-webstorm' },
]
