<script lang="ts" setup>
import type { Activity } from '~~/types'
import { IDEs } from '~~/types'

const { data: activity, error, refresh } = useFetch<Activity>('/api/activity', {
  server: false,
  lazy: true
})
useLiveRefresh(refresh, 5000)

const currentSession = computed(() => {
  const list = activity.value?.data.activities ?? []
  const ideActivity = list.find(a => IDEs.some(ide => ide.name === a.name))

  if (!ideActivity) return null

  const smallText = ideActivity.assets?.small_text
  const name = smallText === 'Cursor' || smallText === 'Positron'
    ? smallText
    : ideActivity.name

  const isIdling = ideActivity.details?.toLowerCase().includes('idling')

  const rawProject = ideActivity.details
    ? ideActivity.details
        .replace('Workspace:', '')
        .replace('Editing', '')
        .trim()
    : 'Building something great...'
  const project = rawProject.charAt(0).toUpperCase() + rawProject.slice(1)
  const file
    = ideActivity.state?.replace('Editing', '').trim() || 'No active file'

  return {
    name,
    project,
    file,
    isIdling,
    startTime: ideActivity.timestamps?.start,
    icon: IDEs.find(ide => ide.name === name)?.icon ?? 'i-ph-code-duotone'
  }
})

const timeAgo = useTimeAgo(
  computed(() => currentSession.value?.startTime ?? new Date())
)

type ActivityStatus = 'blue' | 'neutral'

const statusColor = computed<ActivityStatus>(() => {
  if (!currentSession.value) return 'neutral'
  return currentSession.value.isIdling ? 'neutral' : 'blue'
})

const statusLabel = computed(() => {
  if (!currentSession.value) return 'System Offline'
  if (currentSession.value.isIdling) return 'System Idling'
  return 'Active Development'
})

const headerIcon = computed(() => {
  if (!currentSession.value) return 'i-ph-power-duotone'
  return currentSession.value.isIdling
    ? 'i-ph-hourglass-duotone'
    : currentSession.value.icon
})

const headerIconBg = computed(() => statusColor.value === 'blue'
  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-500'
  : 'bg-neutral-100 dark:bg-neutral-900/30 text-neutral-500')

const hoverRingClass = computed(() => ({
  'hover:ring-blue-500/50': statusColor.value === 'blue',
  'hover:ring-neutral-500/30': statusColor.value !== 'blue'
}))

const barColorClass = computed(() => statusColor.value === 'blue'
  ? 'border-blue-200 dark:border-blue-900/30'
  : 'border-neutral-200 dark:border-neutral-800')
</script>

<template>
  <ClientOnly>
    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      icon="i-ph-warning-circle-duotone"
      title="Activity feed unreachable"
      description="The activity API returned an error. Check the worker logs for details."
    />

    <UCard
      v-else-if="activity"
      class="transition-all duration-200 hover:ring-2"
      :class="[hoverRingClass]"
    >
      <HomeLiveCardHeader
        title="Activity"
        title-size="sm"
        :icon="headerIcon"
        :icon-bg="headerIconBg"
      >
        <template #right>
          <div class="flex items-center gap-2.5">
            <HomeLiveStatusDot :color="statusColor" />
            <span
              class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
            >
              {{ statusLabel }}
            </span>
          </div>
        </template>
      </HomeLiveCardHeader>

      <div
        v-if="currentSession"
        class="space-y-1 py-2 mt-3 pl-6 border-l-2 ml-1.5"
        :class="barColorClass"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <h3 class="font-semibold text-neutral-900 dark:text-white truncate">
            {{ currentSession.project }}
          </h3>
          <span class="hidden sm:inline text-neutral-400 text-xs">•</span>
          <span class="text-sm text-neutral-500 dark:text-neutral-400 truncate">
            {{ currentSession.file }}
          </span>
        </div>

        <div class="flex items-center gap-2 text-xs text-neutral-400 mt-1">
          <UIcon
            name="i-ph-timer-duotone"
            class="w-4 h-4"
          />
          <span>Started {{ timeAgo }}</span>
        </div>
      </div>

      <div
        v-else
        class="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mt-3 pl-6 border-l-2 ml-1.5"
        :class="barColorClass"
      >
        <p>Telemetry disconnected. Research in progress.</p>
      </div>
    </UCard>

    <UCard v-else>
      <div class="flex items-center gap-3">
        <USkeleton class="h-3 w-3 rounded-full" />
        <div class="space-y-2 flex-1">
          <USkeleton class="h-4 w-1/3" />
          <USkeleton class="h-3 w-2/3" />
        </div>
      </div>
    </UCard>
  </ClientOnly>
</template>
