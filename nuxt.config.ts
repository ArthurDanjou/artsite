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
    'nuxt-studio',
    'nuxt-ai-ready',
    'nuxt-skew-protection',
    '@nuxtjs/mcp-toolkit'
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
    wakatime: {
      userId: '',
      coding: '',
      editors: '',
      languages: '',
      os: ''
    },
    ha: {
      url: '',
      token: ''
    },
    indexNowKey: '',
    indexNowSiteUrl: 'https://arthurdanjou.fr'
  },

  experimental: {
    viewTransition: true,
    checkOutdatedBuildInterval: 5 * 60 * 1000
  },
  compatibilityDate: '2026-02-24',

  nitro: {
    preset: 'cloudflare_module',
    experimental: {
      openAPI: true
    },

    // Use the dev-only wrangler config (no ASSETS binding) so @nuxt/content
    // serves its dumps from .nuxt/content/raw instead of the empty .output/public.
    cloudflareDev: {
      configPath: 'wrangler.dev.jsonc'
    },

    prerender: {
      routes: [
        '/',
        '/projects',
        '/publications',
        '/research',
        '/telemetry',
        '/uses',
        '/sitemap.xml',
        '/robots.txt',
        '/llms.txt',
        '/llms-full.txt',
        '/sitemap.md'
      ],
      crawlLinks: true,
      // The Traefik fallback page is fully dynamic (error code from query,
      // host gating, per-request HTTP status): never prerender it, even when
      // the crawler spots it inside the inlined robots debug payload.
      // Studio, APIs and module internals are runtime-only as well.
      ignore: ['/errors', '/studio', '/api', '/__ai-ready', '/__skew', '/mcp']
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

  aiReady: {
    // llms.txt index + llms-full.txt export. `markdownLinks: true` points
    // agents to the static .md twins of prerendered pages.
    llmsTxt: {
      markdownLinks: true,
      notes: [
        'Personal research portfolio of Arthur Danjou, AI Research Intern at CMAP, Ecole Polytechnique.',
        'Topics: AI Safety, Byzantine-robust distributed learning, statistical learning, applied mathematics.',
        'Prefer citing the canonical https://arthurdanjou.fr URLs. Project pages live under /projects/:slug.'
      ],
      sections: [
        {
          title: 'Research',
          links: [
            { title: 'Research interests', href: '/research', description: 'AI Safety, adversarial robustness and distributed learning at CMAP.' },
            { title: 'Publications & Talks', href: '/publications', description: 'Papers in preparation and academic talks with slides.' }
          ]
        },
        {
          title: 'Engineering',
          links: [
            { title: 'Projects', href: '/projects', description: 'Experimental labs, open-source work and engineering projects.' },
            { title: 'Homelab Telemetry', href: '/telemetry', description: 'Live self-hosted infrastructure telemetry.' },
            { title: 'Uses', href: '/uses', description: 'Hardware, software and self-hosted setup.' }
          ]
        },
        {
          title: 'API',
          links: [
            { title: 'OpenAPI spec', href: '/_openapi.json', description: 'Machine-readable API description (Nitro openAPI).' },
            { title: 'MCP endpoint', href: '/mcp', description: 'Model Context Protocol server: list_pages, search_pages, get_page_markdown.' }
          ]
        }
      ]
    },
    sitemapMd: true,
    describedby: true,
    // Publish AI usage preferences in robots.txt. Allow search, RAG/grounding
    // and training so AI search can cite the portfolio. Relies on crawlers
    // honoring Content-Usage / Content-Signal.
    contentSignal: {
      search: true,
      aiInput: true,
      aiTrain: true
    },
    // Reuse the existing Cloudflare D1 binding (see wrangler.jsonc). Build
    // prerendering writes __ai-ready/pages.dump, the Worker restores it into
    // D1 on first query. Enables MCP tools, runtime llms-full.txt and search.
    database: {
      type: 'd1',
      bindingName: 'DB'
    },
    // Prefer raw Markdown from @nuxt/content collections, fall back to
    // rendered HTML conversion for dynamic pages.
    contentSource: true,
    tools: {
      listPages: {
        defaultLimit: 20
      },
      searchPages: {
        defaultLimit: 10
      }
    },
    mcp: {
      tools: true,
      resources: true
    },
    mcpServerCard: {
      title: 'Arthur Danjou Portfolio MCP',
      description: 'Search and read arthurdanjou.fr research portfolio pages.',
      websiteUrl: 'https://arthurdanjou.fr'
    },
    // Expose list_pages / search_pages / get_page_markdown to browser agents.
    webmcp: true,
    // Dynamic content only changes on deploy (static portfolio), but runtime
    // sync keeps the D1 index fresh between builds and powers the
    // /__ai-ready/* admin endpoints. Secret must be stable across deploys:
    // set NUXT_AI_READY_RUNTIME_SYNC_SECRET in the environment.
    runtimeSync: {
      ttl: 3600,
      batchSize: 50
    },
    cron: true,
    prerender: {
      concurrency: 10
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

  icon: {
    clientBundle: {
      scan: {
        globInclude: ['**/*.{vue,ts,js,json,md,mdc,mdx,yml,yaml}'],
        globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*', '.nuxt', '.output']
      },
      sizeLimitKb: 512,
      icons: [
        'vscode-icons:file-type-python'
      ]
    }
  },

  linkChecker: {
    enabled: true,
    showLiveInspections: true,
    runOnBuild: true,
    excludeLinks: ['/errors*', '/studio*']
  },

  mcp: {
    enabled: true
  },

  ogImage: {
    buildCache: true,
    defaults: {
      component: 'Pergel.satori'
    },
    security: {
      renderTimeout: 60000
    }
  },

  robots: {
    // Wildcard group: index everything except app internals. The sitemap URL
    // is injected automatically and AI Ready appends Content-Usage /
    // Content-Signal lines from `aiReady.contentSignal` below.
    // AI crawlers (GPTBot, ClaudeBot, ...) stay allowed on purpose: AEO
    // citation requires readable pages, llms.txt and .md endpoints.
    disallow: ['/studio', '/errors', '/api/', '/__ai-ready/', '/__skew/', '/mcp']
  },

  schemaOrg: {
    identity: definePerson({
      name: 'Arthur Danjou',
      givenName: 'Arthur',
      familyName: 'Danjou',
      image: '/arthur.webp',
      description: 'AI Research Intern at CMAP, Ecole Polytechnique. Focusing on AI Safety, Robustness, and Statistical Learning.',
      jobTitle: 'AI Research Intern',

      email: 'contact@arthurdanjou.fr',
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
    // Disabled: the module 301-redirects EVERY non-canonical host (including
    // errors.arthurdanjou.fr) with no per-host opt-out. The www -> root
    // canonicalization is handled manually in server/middleware/10-errors-guard.ts.
    redirectToCanonicalSiteUrl: false
  },

  sitemap: {
    zeroRuntime: true,
    sources: [
      '/api/__sitemap__/urls'
    ],
    exclude: [
      '/studio/**',
      '/errors/**',
      '/api/**',
      '/__ai-ready/**',
      '/__skew/**',
      '/mcp'
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8
    }
  },

  skewProtection: {
    // Cloudflare Workers (cloudflare_module preset) has no persistent
    // connections: poll for new deployments every 5 min (see
    // experimental.checkOutdatedBuildInterval above). Previous build assets
    // stay available across deploys via the fs cache restored in CI
    // (.github/workflows/cloudflare.yml).
    updateStrategy: 'polling',
    reloadStrategy: 'prompt',
    multiTab: true,
    retentionDays: 30,
    maxNumberOfVersions: 10,
    storage: {
      driver: 'fs',
      base: 'node_modules/.cache/nuxt-seo/skew-protection'
    }
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
