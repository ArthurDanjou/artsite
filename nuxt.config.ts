export default defineNuxtConfig({
  compatibilityDate: '2025-07-20',

  // Nuxt App
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      templateParams: {
        separator: '•',
      },
    },
    rootAttrs: {
      class: 'bg-[var(--ui-bg)]',
    },
  },

  css: ['~/assets/css/main.css'],

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
    preview: {
      api: 'https://api.nuxt.studio',
    },
    build: {
      markdown: {
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'python', 'ts', 'javascript', 'r'],
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
    theme: {
      colors: [
        'white',
        'black',
        'cyan',
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
        'pink',
        'neutral',
      ],
    },
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
        label: 'English',
        code: 'en',
        language: 'en-EN',
        icon: 'i-twemoji-flag-united-kingdom',
      },
      {
        label: 'Français',
        code: 'fr',
        language: 'fr-FR',
        icon: 'i-twemoji-flag-france',
      },
      {
        label: 'Español',
        code: 'es',
        language: 'es-ES',
        icon: 'i-twemoji-flag-spain',
      },
    ],
    defaultLocale: 'en',
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
      websocket: true,
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
    umami: {
      id: '',
      host: '',
    },
    public: {
      i18n: {
        baseUrl: '',
      },
    },
  },

  // Nuxt Visitors
  visitors: {
    // Set to true to enable tracking of visitor locations
    locations: true,
  },
})
