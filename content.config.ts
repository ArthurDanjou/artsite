import { defineCollection, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export const collections = {
  index: defineCollection({
    type: 'page',
    source: 'index.md'
  }),
  projects: defineCollection(
    asSeoCollection({
      type: 'data',
      source: 'projects/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        type: z.enum(['Personal Project', 'Academic Project', 'Hackathon', 'Research Project', 'Internship Project']),
        description: z.string(),
        shortDescription: z.string(),
        publishedAt: z.string(),
        readingTime: z.number(),
        tags: z.array(z.string()),
        favorite: z.boolean().optional(),
        status: z.enum(['Active', 'Completed', 'Archived', 'In progress']),
        icon: z.string()
      })
    })),
  uses: defineCollection({
    type: 'page',
    source: 'uses.md'
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
  experiences: defineCollection({
    type: 'data',
    source: 'experiences/*.md',
    schema: z.object({
      title: z.string(),
      type: z.string().optional(),
      company: z.string(),
      companyUrl: z.string().url().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
      duration: z.string().optional(),
      location: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      icon: z.string()
    })
  }),
  education: defineCollection({
    type: 'data',
    source: 'education/*.md',
    schema: z.object({
      title: z.string(),
      degree: z.string().optional(),
      institution: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      duration: z.string().optional(),
      location: z.string(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      icon: z.string()
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
  hobbies: defineCollection({
    type: 'page',
    source: 'hobbies.md'
  }),
  languages: defineCollection({
    type: 'data',
    source: 'languages.json',
    schema: z.object({
      body: z.array(z.object({
        name: z.string(),
        level: z.string(),
        proficiency: z.string()
      }))
    })
  }),
  profile: defineCollection({
    type: 'page',
    source: 'profile.md'
  })
}
