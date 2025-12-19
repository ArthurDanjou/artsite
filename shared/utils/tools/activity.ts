import type { UIToolInvocation } from 'ai'
import { tool } from 'ai'
import type { Activity } from '~~/types'

export type ActivityUIToolInvocation = UIToolInvocation<typeof activityTool>

export const activityTool = tool({
  description: 'Real-time current activity and status of Arthur Danjou, including what he\'s currently working on',
  execute: async () => {
    return await $fetch<Activity>('/api/activity')
  }
})
