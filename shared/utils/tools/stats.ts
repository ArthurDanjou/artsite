import type { UIToolInvocation } from 'ai'
import { tool } from 'ai'
import type { Stats } from '~~/types'

export type StatsUIToolInvocation = UIToolInvocation<typeof statsTool>

export const statsTool = tool({
  description: 'Detailed coding statistics and analytics from WakaTime, including programming languages, time spent coding, and productivity metrics',
  execute: async () => {
    return await $fetch<Stats>('/api/stats')
  }
})
