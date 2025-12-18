export default defineNuxtConfig({
  compatibilityDate: '2025-12-13',

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

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-studio'
  ],

  hub: {
    cache: true,
    db: 'sqlite',
  },

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

  studio: {
    route: '/studio',
    repository: {
      provider: 'github',
      owner: 'ArthurDanjou',
      repo: 'artsite',
      branch: 'master'
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  devtools: {
    enabled: true,
  },

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

  routeRules: {
    '/api/activity': { swr: 3 },
  },

  nitro: {
    preset: 'cloudflare_pages',

    prerender: {
      routes: ['/'],
      crawlLinks: true,
    }
  },

  runtimeConfig: {
    api: {
      url: ''
    },
    public: {
      i18n: {
        baseUrl: '',
      },
    },
  },
})