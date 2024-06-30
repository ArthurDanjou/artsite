export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

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
    '@nuxtjs/seo'
  ],

  // Nuxt Hub
  hub: {
    cache: true,
    kv: true,
    database: true,
    analytics: true
  },

  // Nuxt SEO
  site: {
    url: 'https://artsite.nuxt.dev',
    name: 'Arthur Danjou',
    description: 'I\'m Arthur, a Mathematics lover and IA enthusiast. I\'m currently studying at the University of Paris-Saclay. I\'m passionate about Mathematics, Computer Science, and Artificial Intelligence.',
    defaultLocale: 'en',
    trailingSlash: false
  },

  // Disable to reduce size
  ogImage: {
    enabled: false
  },
  seoExperiments: {
    enabled: false
  },
  linkChecker: {
    enabled: false
  },

  // Nuxt Content
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },

  // Nuxt ColorMode
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
