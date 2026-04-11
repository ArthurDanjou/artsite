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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://arthurdanjou.fr',
    name: 'Arthur Danjou',
    description: 'AI Research Intern at CMAP, Ecole Polytechnique. Focusing on AI Safety, Robustness, and Statistical Learning.',
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
        },
        remarkPlugins: {
          'remark-math': {}
        },
        rehypePlugins: {
          'rehype-katex': { output: 'html' }
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
  compatibilityDate: '2026-02-24',

  nitro: {
    preset: 'cloudflare_module',
    experimental: {
      openAPI: true
    },

    prerender: {
      routes: ['/'],
      crawlLinks: true
    },

    externals: {
      inline: ['sharp']
    }
  },

  hub: {
    cache: true,
    db: 'sqlite'
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@unhead/schema-org/vue'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  ogImage: {
    buildCache: true
  },

  schemaOrg: {
    identity: definePerson({
      name: 'Arthur Danjou',
      givenName: 'Arthur',
      familyName: 'Danjou',
      image: '/arthur.webp',
      description: 'AI Research Intern at CMAP, Ecole Polytechnique. Focusing on AI Safety, Robustness, and Statistical Learning.',
      jobTitle: 'AI Research Intern',

      email: 'arthurdanjou@outlook.fr',
      url: 'https://arthurdanjou.fr',
      sameAs: [
        'https://twitter.com/arthurdanj',
        'https://github.com/arthurdanjou',
        'https://linkedin.com/in/arthurdanjou'
      ],

      worksFor: {
        '@type': 'Organization',
        'name': 'Arthur Danjou',
        'url': 'https://arthurdanjou.fr'
      }
    })
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  },

  sitemap: {
    zeroRuntime: true
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
