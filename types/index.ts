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
  assets?: {
    small_text: string
  }
}

export interface Activity {
  data: {
    activities: Array<LanyardActivity>
  }
}

export const IDEs = [
  { name: 'Visual Studio Code', icon: 'i-logos:visual-studio-code' },
  { name: 'IntelliJ IDEA Ultimate', icon: 'i-logos:intellij-idea' },
  { name: 'WebStorm', icon: 'i-logos:webstorm' },
  { name: 'PyCharm Professional', icon: 'i-logos:pycharm' },
  { name: 'Cursor', icon: 'i-vscode-icons-file-type-cursorrules' },
]

export const activityMessages = {
  en: {
    justNow: 'just now',
    past: (n: string) => (n.match(/\d/) ? `${n} ago` : n),
    future: (n: string) => (n.match(/\d/) ? `in ${n}` : n),
    month: (n: number, past: boolean) =>
      n === 1 ? (past ? 'last month' : 'next month') : `${n} month${n > 1 ? 's' : ''}`,
    year: (n: number, past: boolean) =>
      n === 1 ? (past ? 'last year' : 'next year') : `${n} year${n > 1 ? 's' : ''}`,
    day: (n: number, past: boolean) =>
      n === 1 ? (past ? 'yesterday' : 'tomorrow') : `${n} day${n > 1 ? 's' : ''}`,
    week: (n: number, past: boolean) =>
      n === 1 ? (past ? 'last week' : 'next week') : `${n} week${n > 1 ? 's' : ''}`,
    hour: (n: number) => `${n} hour${n > 1 ? 's' : ''}`,
    minute: (n: number) => `${n} minute${n > 1 ? 's' : ''}`,
    second: (n: number) => `${n} second${n > 1 ? 's' : ''}`,
    invalid: '',
  },
  fr: {
    justNow: 'à l\'instant',
    past: (n: string) => (n.match(/\d/) ? `il y a ${n}` : n),
    future: (n: string) => (n.match(/\d/) ? `dans ${n}` : n),
    month: (n: number, past: boolean) =>
      n === 1 ? (past ? 'le mois dernier' : 'le mois prochain') : `${n} mois`,
    year: (n: number, past: boolean) =>
      n === 1 ? (past ? 'l\'année dernière' : 'l\'année prochaine') : `${n} ans`,
    day: (n: number, past: boolean) =>
      n === 1 ? (past ? 'hier' : 'demain') : `${n} jours`,
    week: (n: number, past: boolean) =>
      n === 1 ? (past ? 'la semaine dernière' : 'la semaine prochaine') : `${n} semaines`,
    hour: (n: number) => `${n} heure${n > 1 ? 's' : ''}`,
    minute: (n: number) => `${n} minute${n > 1 ? 's' : ''}`,
    second: (n: number) => `${n} seconde${n > 1 ? 's' : ''}`,
    invalid: '',
  },
  es: {
    justNow: 'justo ahora',
    past: (n: string) => (n.match(/\d/) ? `hace ${n}` : n),
    future: (n: string) => (n.match(/\d/) ? `dentro de ${n}` : n),
    month: (n: number, past: boolean) =>
      n === 1 ? (past ? 'el mes pasado' : 'el próximo mes') : `${n} meses`,
    year: (n: number, past: boolean) =>
      n === 1 ? (past ? 'el año pasado' : 'el próximo año') : `${n} años`,
    day: (n: number, past: boolean) =>
      n === 1 ? (past ? 'ayer' : 'mañana') : `${n} días`,
    week: (n: number, past: boolean) =>
      n === 1 ? (past ? 'la semana pasada' : 'la próxima semana') : `${n} semanas`,
    hour: (n: number) => `${n} hora${n > 1 ? 's' : ''}`,
    minute: (n: number) => `${n} minuto${n > 1 ? 's' : ''}`,
    second: (n: number) => `${n} segundo${n > 1 ? 's' : ''}`,
    invalid: '',
  },
}

export interface Tag {
  label: string
  title?: string
  translation: string
}

export const TAGS: Array<Tag> = [
  {
    label: 'R',
    translation: 'tags.r',
  },
  {
    label: 'AI',
    translation: 'tags.ai',
  },
  {
    label: 'Data',
    translation: 'tags.data',
  },
  {
    label: 'Web',
    translation: 'tags.web',
  },
  {
    label: 'Python',
    translation: 'tags.python',
  },
  {
    label: 'Maths',
    translation: 'tags.maths',
  },
]

export const socials = [
  {
    icon: 'i-ph:x-logo-duotone',
    label: 'Twitter',
    to: 'https://twitter.com/ArthurDanj',
  },
  {
    icon: 'i-ph:github-logo-duotone',
    label: 'GitHub',
    to: 'https://github.com/ArthurDanjou',
  },
  {
    icon: 'i-ph:linkedin-logo-duotone',
    label: 'LinkedIn',
    to: 'https://www.linkedin.com/in/arthurdanjou/',
  },
  {
    icon: 'i-ph:discord-logo-duotone',
    label: 'Discord',
    to: 'https://discordapp.com/users/179635349100691456',
  },
]
