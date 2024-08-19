export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  // Nuxt App
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      templateParams: {
        separator: '•',
      },
    },
  },

  // Nuxt Modules
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxthq/studio',
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-mapbox',
  ],

  // Nuxt Hub
  hub: {
    cache: true,
    kv: true,
    database: true,
    analytics: true,
  },

  // Nuxt Content
  content: {
    highlight: {
      theme: 'github-dark',
    },
    locales: ['en', 'fr'],
  },

  // Nuxt UI
  ui: {
    safelistColors: [
      'slate',
      'gray',
      'zinc',
      'neutral',
      'stone',
      'red',
      'orange',
      'amber',
      'yellow',
      'lime',
      'green',
      'emerald',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
      'black',
      'white',
    ],
  },

  // Nuxt Color Mode
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  // Nuxt Devtools
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },

  // Nuxt I18N
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        language: 'en-EN',
        icon: 'i-twemoji-flag-united-kingdom',
      },
      {
        code: 'fr',
        language: 'fr-FR',
        icon: 'i-twemoji-flag-france',
      },
    ],
    defaultLocale: 'en',
  },

  // Nuxt Icon
  icon: {
    serverBundle: {
      collections: ['ph', 'twemoji', 'logos'],
    },
  },

  // Nuxt Google Fonts
  googleFonts: {
    display: 'swap',
    families: {
      'Inter': [400, 500, 600, 700, 800, 900],
      'Sofia Sans': [400],
      'DM Sans': [400, 500, 600, 700, 800, 900],
      'Dancing Script': [400, 700],
    },
  },

  // Nitro
  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  // Nuxt Env
  runtimeConfig: {
    discord: {
      userId: '',
      id: '',
      token: '',
    },
    wakatime: {
      userId: '',
      coding: '',
      editors: '',
      languages: '',
      os: '',
    },
    public: {
      cloud: {
        resume: '',
      },
      mapbox: {
        accessToken: '',
        style: {
          light: '',
          dark: '',
        },
      },
    },
  },

  compatibilityDate: '2024-07-08',
})
