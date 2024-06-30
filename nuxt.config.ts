// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxthq/studio',
    '@nuxt/image',
    '@nuxtjs/seo'
  ],

  hub: {
    cache: true,
    kv: true,
    database: true,
    analytics: true
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' }
    }
  },

  site: {
    url: 'https://arthurdanjou.fr',
    name: 'Arthur Danjou | Mathematics Lover and IA Enthusiast',
    description: 'I\'m Arthur, a Mathematics lover and IA enthusiast. I\'m currently studying at the University of Paris-Saclay. I\'m passionate about Mathematics, Computer Science, and Artificial Intelligence.',
    defaultLocale: 'en'
  },

  content: {
    highlight: {
      theme: 'github-dark'
    }
  },

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  ui: {
    icons: ['heroicons', 'logos', 'ph']
  },

  devtools: {
    enabled: true,
    timeline: { enabled: true }
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  googleFonts: {
    display: 'swap',
    families: {
      'Inter': [400, 500, 600, 700, 800, 900],
      'Sofia Sans': [400],
      'DM Sans': [400, 500, 600, 700, 800, 900],
      'Dancing Script': [400, 700]
    }
  },

  nitro: {
    experimental: {
      openAPI: true
    }
  },

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
