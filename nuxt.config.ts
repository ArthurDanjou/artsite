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
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-visitors',
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
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {
            output: 'mathml',
          },
        },
      },
    },
  },

  // Nuxt UI
  ui: {
    safelistColors: [
      'gray',
      'zinc',
      'red',
      'orange',
      'amber',
      'green',
      'emerald',
      'sky',
      'blue',
      'purple',
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
      {
        code: 'es',
        language: 'es-ES',
        icon: 'i-twemoji-flag-spain',
      },
    ],
    defaultLocale: 'en',
  },

  // Nuxt Icon
  icon: {
    serverBundle: 'remote',
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
    preset: 'cloudflare_durable',
    experimental: {
      websocket: true,
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
      i18n: {
        baseUrl: '',
      },
    },
  },

  compatibilityDate: '2025-01-28',
})
