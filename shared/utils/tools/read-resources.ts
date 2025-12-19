import type { UIToolInvocation } from 'ai'
import { tool } from 'ai'
import { z } from 'zod'

export type resourceUIToolInvocation = UIToolInvocation<typeof resourceTool>

export const resourceTool = tool({
  description: 'Read a resource from the server API',
  inputSchema: z.object({
    resource: z.enum([
      'contact',
      'education',
      'experiences',
      'hobbies',
      'languages',
      'profile',
      'projects',
      'skills',
      'uses'
    ]).describe('resource name')
  }),
  execute: async ({ resource }) => {
    return await $fetch(`/api/${resource}`)
  }
})
