import { defineCollection, z } from '@nuxt/content'

export const collections = {
  main: defineCollection({
    type: 'page',
    source: 'home/*.md',
  }),
  portfolio: defineCollection({
    type: 'page',
    source: 'portfolio/*.md',
    schema: z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      publishedAt: z.date(),
      readingTime: z.number(),
      cover: z.string(),
      tags: z.array(z.string()),
    }),
  }),
  uses: defineCollection({
    type: 'data',
    source: 'uses/*.json',
    schema: z.object({
      name: z.string(),
      description: z.object({
        en: z.string(),
        fr: z.string(),
        es: z.string(),
      }),
      category: z.string(),
    }),
  }),
}
