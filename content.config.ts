import { defineCollection, z } from '@nuxt/content'

export const collections = {
  index: defineCollection({
    type: 'page',
    source: 'index.md'
  }),
  projects: defineCollection({
    type: 'data',
    source: 'projects/*.md',
    schema: z.object({
      slug: z.string(),
      title: z.string(),
      type: z.string().optional(),
      description: z.string(),
      publishedAt: z.string(),
      readingTime: z.number().optional(),
      tags: z.array(z.string()),
      cover: z.string().optional(),
      favorite: z.boolean().optional(),
      status: z.string().optional(),
      emoji: z.string().optional()
    })
  }),
  uses: defineCollection({
    type: 'page',
    source: 'uses.md'
  }),
  skills: defineCollection({
    type: 'data',
    source: 'skills.json',
    schema: z.object({
      description: z.string(),
      skills: z.array(z.object({
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
      emoji: z.string().optional()
    })
  }),
  education: defineCollection({
    type: 'data',
    source: 'education/*.md',
    schema: z.object({
      title: z.string(),
      type: z.string().optional(),
      degree: z.string().optional(),
      institution: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      duration: z.string().optional(),
      location: z.string(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      emoji: z.string().optional()
    })
  }),
  contact: defineCollection({
    type: 'data',
    source: 'contact.json',
    schema: z.object({
      contact: z.array(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
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
      languages: z.array(z.object({
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
