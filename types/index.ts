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
    data: WakatimeData[]
  }
  os: {
    data: WakatimeData[]
  }
  languages: {
    data: WakatimeData[]
  }
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

type TimeUnit = (n: number, past?: boolean) => string
type TimeFormatter = (n: string) => string

interface ActivityMessages {
  justNow: string
  past: TimeFormatter
  future: TimeFormatter
  month: TimeUnit
  year: TimeUnit
  day: TimeUnit
  week: TimeUnit
  hour: TimeUnit
  minute: TimeUnit
  second: TimeUnit
  invalid: string
}

function createTimeUnit(singular: string, plural: string, pastSingular?: string, futureSingular?: string): TimeUnit {
  return (n: number, past = true) => {
    if (n === 1) {
      return past ? (pastSingular || `last ${singular}`) : (futureSingular || `next ${singular}`)
    }
    return `${n} ${plural}`
  }
}

function createSimpleTimeUnit(unit: string): TimeUnit {
  return (n: number) => `${n} ${unit}${n > 1 ? 's' : ''}`
}

export const activityMessages: Record<'en' | 'fr' | 'es', ActivityMessages> = {
  en: {
    justNow: 'just now',
    past: (n: string) => n.match(/\d/) ? `${n} ago` : n,
    future: (n: string) => n.match(/\d/) ? `in ${n}` : n,
    month: createTimeUnit('month', 'months'),
    year: createTimeUnit('year', 'years'),
    day: createTimeUnit('day', 'days', 'yesterday', 'tomorrow'),
    week: createTimeUnit('week', 'weeks'),
    hour: createSimpleTimeUnit('hour'),
    minute: createSimpleTimeUnit('minute'),
    second: createSimpleTimeUnit('second'),
    invalid: ''
  },
  fr: {
    justNow: 'à l\'instant',
    past: (n: string) => n.match(/\d/) ? `il y a ${n}` : n,
    future: (n: string) => n.match(/\d/) ? `dans ${n}` : n,
    month: (n: number, past = true) => n === 1 ? (past ? 'le mois dernier' : 'le mois prochain') : `${n} mois`,
    year: (n: number, past = true) => n === 1 ? (past ? 'l\'année dernière' : 'l\'année prochaine') : `${n} ans`,
    day: (n: number, past = true) => n === 1 ? (past ? 'hier' : 'demain') : `${n} jours`,
    week: (n: number, past = true) => n === 1 ? (past ? 'la semaine dernière' : 'la semaine prochaine') : `${n} semaines`,
    hour: createSimpleTimeUnit('heure'),
    minute: createSimpleTimeUnit('minute'),
    second: createSimpleTimeUnit('seconde'),
    invalid: ''
  },
  es: {
    justNow: 'justo ahora',
    past: (n: string) => n.match(/\d/) ? `hace ${n}` : n,
    future: (n: string) => n.match(/\d/) ? `dentro de ${n}` : n,
    month: (n: number, past = true) => n === 1 ? (past ? 'el mes pasado' : 'el próximo mes') : `${n} meses`,
    year: (n: number, past = true) => n === 1 ? (past ? 'el año pasado' : 'el próximo año') : `${n} años`,
    day: (n: number, past = true) => n === 1 ? (past ? 'ayer' : 'mañana') : `${n} días`,
    week: (n: number, past = true) => n === 1 ? (past ? 'la semana pasada' : 'la próxima semana') : `${n} semanas`,
    hour: createSimpleTimeUnit('hora'),
    minute: createSimpleTimeUnit('minuto'),
    second: createSimpleTimeUnit('segundo'),
    invalid: ''
  }
}

export const socials = [
  { icon: 'i-ph-x-logo-duotone', label: 'Twitter', to: 'https://go.arthurdanjou.fr/twitter' },
  { icon: 'i-ph-github-logo-duotone', label: 'GitHub', to: 'https://go.arthurdanjou.fr/github' },
  { icon: 'i-ph-linkedin-logo-duotone', label: 'LinkedIn', to: 'https://go.arthurdanjou.fr/linkedin' },
  { icon: 'i-ph-discord-logo-duotone', label: 'Discord', to: 'https://go.arthurdanjou.fr/discord' }
] as const

type Locale = 'en' | 'fr' | 'es'

interface Nav {
  label: Record<Locale, string>
  to: string
  icon?: string
  target?: string
}

export const navs: readonly Nav[] = [
  { label: { en: 'home', fr: 'accueil', es: 'inicio' }, to: '/', icon: 'house-duotone' },
  { label: { en: 'chat', fr: 'chat', es: 'chat' }, to: '/chat', icon: 'chat-circle-dots-duotone' },
  {
    label: { en: 'resume', fr: 'cv', es: 'currículum' },
    icon: 'address-book-duotone',
    to: 'https://api.arthurdanjou.fr/api/resumes/en',
    target: '_blank'
  }
] as const
