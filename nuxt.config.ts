export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  // Nuxt App
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      templateParams: {
        separator: '•'
      }
    }
  },

  // Nuxt Modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxthq/studio',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    'nuxt-simple-robots'
  ],

  // Nuxt SiteMap
  sitemap: {
    cacheMaxAgeSeconds: 60 * 60 * 24, // 24 hours
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  // Nuxt Hub
  hub: {
    cache: true,
    kv: true,
    database: true,
    analytics: true
  },

  // Nuxt Content
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },

  // Nuxt Color Mode
  colorMode: {
    preference: 'system',
    fallback: 'light'
  },

  // Nuxt Devtools
  devtools: {
    enabled: true,
    timeline: { enabled: true }
  },

  // Nuxt Eslint
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  // Nuxt Google Fonts
  googleFonts: {
    display: 'swap',
    families: {
      'Inter': [400, 500, 600, 700, 800, 900],
      'Sofia Sans': [400],
      'DM Sans': [400, 500, 600, 700, 800, 900],
      'Dancing Script': [400, 700]
    }
  },

  // Nitro
  nitro: {
    experimental: {
      openAPI: true
    }
  },

  // Nuxt Env
  runtimeConfig: {
    discord: {
      userId: '',
      id: '',
      token: ''
    },
    wakatime: {
      userId: '',
      coding: '',
      editors: '',
      languages: '',
      os: ''
    },
    public: {
      cloud: {
        resume: ''
      }
    }
  }
})
