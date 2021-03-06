// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
import {NuxtOptionsModule} from "@nuxt/types/config/module";

const color_mode = {
  preference: 'system',
  fallback: 'light',
  classPrefix: '',
  classSuffix: '',
}

const windicss = {
  scan: {
    dirs: [ './' ],
    exclude: [
      'node_modules',
      '.git',
      '.nuxt/**/*',
      'build/**/*',
      '*.template.html',
      'app.html'
    ],
    include: []
  },
  transformCSS: 'pre',
  preflight: {
    alias: {
      // add nuxt aliases
      'nuxt-link': 'a',
      // @nuxt/image module
      'nuxt-img': 'img',
    }
  }
}

export default [
  '@nuxt/typescript-build',
  '@nuxtjs/composition-api/module',
  ['nuxt-windicss', windicss],
  ['@nuxtjs/color-mode', color_mode],
] as NuxtOptionsModule[]
