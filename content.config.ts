import { defineCollection, z } from '@nuxt/content'

export const collections = {
  main: defineCollection({
    type: 'page',
    source: 'home/*.md',
  }),
}
