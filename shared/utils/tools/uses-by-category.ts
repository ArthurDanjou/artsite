import type { UIToolInvocation } from 'ai'
import { tool } from 'ai'
import { z } from 'zod'

export type UsesByCategoryUIToolInvocation = UIToolInvocation<typeof usesByCategoryTool>

export const usesByCategoryTool = tool({
  description: 'Retrieves a filtered list of tools, software, and hardware used by Arthur Danjou based on a specific category. Available categories: homelab, IDE, hardware, and software.',
  inputSchema: z.object({
    categoryName: z.enum(['homelab', 'ide', 'hardware', 'software']).describe('The category to filter by: \'homelab\', \'ide\', \'hardware\', or \'software\'.')
  }),
  execute: async ({ categoryName }: { categoryName: 'homelab' | 'ide' | 'hardware' | 'software' }) => {
    const uses = await $fetch<{ category: string }[]>('/api/uses')

    return uses.filter(use => use.category === categoryName)
  }
})
