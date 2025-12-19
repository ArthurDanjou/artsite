import type { UIToolInvocation } from 'ai'
import { tool } from 'ai'

export type StatusPageUIToolInvocation = UIToolInvocation<typeof statusPageTool>

export const statusPageTool = tool({
  description: 'Real-time status, uptime monitoring, and incident reports for Arthur Danjou\'s homelab infrastructure, powered by UptimeKuma',
  execute: async () => {
    return await $fetch('/api/status-page')
  }
})
