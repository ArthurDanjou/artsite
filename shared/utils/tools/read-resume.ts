import type { UIToolInvocation } from 'ai'
import { tool } from 'ai'
import { z } from 'zod'

export type ResumesUIToolInvocation = UIToolInvocation<typeof resumesTool>

export const resumesTool = tool({
  description: 'Retrieves a direct download link to Arthur Danjou\'s professional resume in the specified language. Supports both English and French versions.',
  inputSchema: z.object({
    lang: z.enum(['en', 'fr']).describe('The language for the resume: \'en\' for English or \'fr\' for French.')
  }),
  execute: async ({ lang }) => {
    return `/api/resumes/${lang}`
  }
})
