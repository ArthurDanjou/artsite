// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    "@nuxtjs/google-fonts"
  ],

  hub: {
    cache: true,
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  content: {
    highlight: {
      theme: "github-dark",
    },
  },

  colorMode: {
    preference: "light",
    fallback: "light",
  },

  ui: {
    icons: ["heroicons", "logos", "ph"],

  },

  devtools: {
    enabled: true,
    timeline: { enabled: true, }
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
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
      'Sofia Sans': [400],
      'DM Sans': [400, 500, 600, 700, 800, 900],
    },
  },
})