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
    '@nuxt/image'
  ],

  hub: {
    cache: true,
    kv: true
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
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
    discordUserId: process.env.NUXT_DISCORD_USER_ID,
    discordId: process.env.NUXT_DISCORD_ID,
    discordToken: process.env.NUXT_DISCORD_TOKEN,
    wakatimeUserId: process.env.NUXT_WAKATIME_USER_UD,
    wakatimeCodig: process.env.NUXT_WAKATIME_CODING,
    wakatimeEditors: process.env.NUXT_WAKATIME_EDITORS,
    wakatimeLanguages: process.env.NUXT_WAKATIME_LANGUAGES,
    wakatimeOs: process.env.NUXT_WAKATIME_OS
  }
})
