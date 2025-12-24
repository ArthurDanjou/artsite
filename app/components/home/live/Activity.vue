<script lang="ts" setup>
import type { Activity } from '~~/types'
import { IDEs } from '~~/types'

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'), { lazy: true })
useIntervalFn(refresh, 5000)

const currentSession = computed(() => {
  const list = activity.value?.data.activities ?? []
  const ideActivity = list.find(a => IDEs.some(ide => ide.name === a.name))

  if (!ideActivity) return null

  const name = ideActivity.assets?.small_text === 'Cursor' ? 'Cursor' : ideActivity.name

  const isIdling = ideActivity.details?.includes('Idling') || (!ideActivity.state?.toLowerCase().includes('editing') && name !== 'Visual Studio Code')

  const rawProject = ideActivity.details ? ideActivity.details.replace('Workspace:', '').replace('Editing', '').trim() : 'Unknown Context'
  const project = rawProject.charAt(0).toUpperCase() + rawProject.slice(1)
  const file = ideActivity.state?.replace('Editing', '').trim() || 'No active file'

  return {
    name,
    project,
    file,
    isIdling,
    startTime: ideActivity.timestamps?.start,
    icon: IDEs.find(ide => ide.name === name)?.icon ?? 'i-ph-code-duotone'
  }
})

const timeAgo = useTimeAgo(computed(() => currentSession.value?.startTime ?? new Date()))

const statusColor = computed(() => {
  if (!currentSession.value) return 'red'
  return currentSession.value.isIdling ? 'orange' : 'green'
})

const statusLabel = computed(() => {
  if (!currentSession.value) return 'System Offline'
  if (currentSession.value.isIdling) return 'System Idling'
  return 'Active Development'
})
</script>

<template>
  <ClientOnly>
    <UCard v-if="activity">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="relative flex h-3 w-3">
            <span
              v-if="statusColor === 'green'"
              class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400"
            />
            <span
              class="relative inline-flex rounded-full h-3 w-3 transition-colors duration-300"
              :class="{
                'bg-green-500': statusColor === 'green',
                'bg-orange-500': statusColor === 'orange',
                'bg-red-500': statusColor === 'red'
              }"
            />
          </div>

          <span class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {{ statusLabel }}
          </span>
        </div>

        <UIcon
          v-if="currentSession"
          :name="currentSession.icon"
          class="w-5 h-5 opacity-80"
        />
        <UIcon
          v-else
          name="i-ph-power-duotone"
          class="w-5 h-5 text-red-400 opacity-80"
        />
      </div>

      <div
        v-if="currentSession"
        class="space-y-1 pl-6 border-l-2 border-neutral-200 dark:border-neutral-800 ml-1.5"
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
        class="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 pl-6 border-l-2 border-red-100 dark:border-red-900/30 ml-1.5"
      >
        <p>Telemetry disconnected. Research in progress.</p>
      </div>
    </UCard>

    <UCard v-else>
      <div class="flex items-center gap-3">
        <USkeleton class="h-3 w-3 rounded-full" /> <div class="space-y-2 flex-1">
          <USkeleton class="h-4 w-1/3" />
          <USkeleton class="h-3 w-2/3" />
        </div>
      </div>
    </UCard>
  </ClientOnly>
</template>
