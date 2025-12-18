import { defineCollection } from '@nuxt/content'

export const collections = {
  main: defineCollection({
    type: 'page',
    source: 'home/*.md'
  })
}
