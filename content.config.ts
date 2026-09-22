import { defineCollection, defineContentConfig } from '@nuxt/content'
import { defineRobotsSchema } from '@nuxtjs/robots/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { defineOgImageSchema } from 'nuxt-og-image/content'
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'
import { z } from 'zod'

const pageSeoSchema = z.object({
  robots: defineRobotsSchema(),
  sitemap: defineSitemapSchema(),
  ogImage: defineOgImageSchema(),
  schemaOrg: defineSchemaOrgSchema()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.md',
      schema: pageSeoSchema
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        type: z.enum(['Personal Project', 'Academic Project', 'Hackathon', 'Research Project']),
        description: z.string(),
        shortDescription: z.string(),
        publishedAt: z.string(),
        readingTime: z.number().optional(),
        tags: z.array(z.string()),
        favorite: z.boolean().optional(),
        status: z.enum(['Active', 'Completed', 'Archived']),
        icon: z.string()
      })
    }),
    uses: defineCollection({
      type: 'page',
      source: 'uses.md',
      schema: pageSeoSchema
    }),    telemetry: defineCollection({
      type: 'page',
      source: 'telemetry.md',
      schema: pageSeoSchema
    }),
    research: defineCollection({
      type: 'page',
      source: 'research.md',
      schema: pageSeoSchema
    }),
    publish: defineCollection({
      type: 'page',
      source: 'publish.md',
      schema: pageSeoSchema
    }),
    publications: defineCollection({
      type: 'data',
      source: 'publications.json',
      schema: z.object({
        body: z.array(z.object({
          id: z.string(),
          title: z.string(),
          year: z.number().optional(),
          status: z.string().optional(),
          authors: z.string().optional(),
          description: z.string(),
          icon: z.string().optional(),
          tags: z.array(z.string()).optional(),
          url: z.string().url().optional(),
          linkLabel: z.string().optional()
        }))
      })
    }),
    skills: defineCollection({
      type: 'data',
      source: 'skills.json',
      schema: z.object({
        body: z.array(z.object({
          id: z.string(),
          name: z.string(),
          description: z.string().optional(),
          items: z.array(z.object({
            name: z.string(),
            icon: z.string().optional()
          }))
        }))
      })
    }),
    contact: defineCollection({
      type: 'data',
      source: 'contact.json',
      schema: z.object({
        body: z.array(z.object({
          id: z.string(),
          name: z.string(),
          category: z.string().optional(),
          icon: z.string().optional(),
          value: z.string().url(),
          username: z.string().optional(),
          priority: z.number().optional()
        }))
      })
    }),
    languages: defineCollection({
      type: 'data',
      source: 'languages.json',
      schema: z.object({
        body: z.array(z.object({
          id: z.string(),
          name: z.string(),
          level: z.string(),
          proficiency: z.string()
        }))
      })
    }),
    talks: defineCollection({
      type: 'data',
      source: 'talks.json',
      schema: z.object({
        body: z.array(z.object({
          id: z.string(),
          title: z.string(),
          date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, 'Use ISO date YYYY-MM or YYYY-MM-DD'),
          venue: z.string(),
          description: z.string(),
          icon: z.string().optional(),
          tags: z.array(z.string()).optional(),
          lang: z.enum(['fr', 'en']).optional(),
          upcoming: z.boolean().optional(),
          slides: z.string().url().nullable().optional()
        }))
      })
    })
  }
})
