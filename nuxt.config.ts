import { definePerson } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({

  modules: [
    '@nuxtjs/seo',
    '@nuxt/ui',
    '@nuxtjs/mdc',
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    rootAttrs: {
      class: 'bg-[var(--ui-bg)]'
    },
    head: {
      templateParams: {
        separator: '•'
      },
      titleTemplate: '%s %separator %siteName',
      link: [
        { rel: 'icon', type: 'image/webp', href: '/favicon.webp' },
        { rel: 'apple-touch-icon', href: '/favicon.webp' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://arthurdanjou.fr',
    name: 'Arthur Danjou',
    description: 'Research Engineer & Applied Mathematics Student. Focusing on AI Safety, Robustness, and Statistical Learning.',
    defaultLocale: 'en',
    indexable: true
  },

  colorMode: {
    preference: 'system',
    fallback: 'light'
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['python'],
          theme: {
            default: 'catppuccin-latte',
            dark: 'catppuccin-macchiato'
          }
        }
      }
    },
    database: {
      type: 'd1',
      bindingName: 'DB'
    }
  },

  mdc: {
    headings: {
      anchorLinks: false
    }
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
        'neutral'
      ]
    }
  },

  runtimeConfig: {
    discord: {
      userId: '',
      id: ''
    },
    statusPage: '',
    wakatime: {
      userId: '',
      coding: '',
      editors: '',
      languages: '',
      os: ''
    }
  },

  experimental: {
    viewTransition: true
  },
  compatibilityDate: '2025-12-13',

  nitro: {
    preset: 'cloudflare_module',
    experimental: {
      openAPI: true
    },

    prerender: {
      crawlLinks: true
    }
  },

  hub: {
    cache: true,
    db: 'sqlite'
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  schemaOrg: {
    identity: definePerson({
      name: 'Arthur Danjou',
      givenName: 'Arthur',
      familyName: 'Danjou',
      image: '/arthur.webp',
      description: 'Research Engineer & Applied Mathematics Student. Focusing on AI Safety, Robustness, and Statistical Learning.',
      jobTitle: 'Research Engineer & Applied Mathematics Student',

      email: 'arthurdanjou@outlook.fr',
      url: 'https://arthurdanjou.fr',
      sameAs: [
        'https://twitter.com/arthurdanj',
        'https://github.com/arthurdanjou',
        'https://linkedin.com/in/arthurdanjou'
      ]
    })
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  },

  studio: {
    route: '/studio',
    repository: {
      provider: 'github',
      owner: 'ArthurDanjou',
      repo: 'artsite',
      branch: 'master'
    }
  }
})
