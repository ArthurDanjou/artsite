<script lang="ts" setup>
import type { StatusPageData } from '~~/types'

const { data, status, error } = await useAsyncData<StatusPageData>('home-status', () =>
  $fetch('/api/status-page'),
{ lazy: true }
)

const isLoading = computed(() => status.value === 'pending')

const metrics = computed(() => {
  if (!data.value || !data.value.publicGroupList) {
    return { up: 0, down: 0, maintenance: 0, total: 0, uptime: 0 }
  }

  let upCount = 0
  let downCount = 0
  let totalCount = 0

  data.value.publicGroupList.forEach((group) => {
    group.monitorList.forEach((monitor) => {
      totalCount++
      const isUp = (monitor as unknown as { status: number }).status !== 0
      if (isUp) upCount++
      else downCount++
    })
  })

  const activeMaintenances = data.value.maintenanceList?.filter(m => m.active).length || 0

  const uptimePercent = totalCount > 0 ? ((upCount / totalCount) * 100).toFixed(1) : '0.0'

  return {
    up: upCount,
    down: downCount,
    maintenance: activeMaintenances,
    total: totalCount,
    uptime: Number(uptimePercent)
  }
})

const statusState = computed(() => {
  if (isLoading.value) return { color: 'neutral' as const, label: 'Checking status...' }
  if (metrics.value.down > 0) return { color: 'red' as const, label: 'Service Disruption' }
  if (metrics.value.maintenance > 0) return { color: 'blue' as const, label: 'Maintenance Mode' }
  return { color: 'emerald' as const, label: 'All Systems Operational' }
})
</script>

<template>
  <ClientOnly>
    <UCard v-if="!error" class="h-full flex flex-col overflow-hidden">
      <div class="p-5 border-b border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-bold text-neutral-900 dark:text-white text-sm">
            System Status
          </h3>

          <div class="flex items-center gap-2">
            <span
              v-if="!isLoading"
              class="relative flex h-2.5 w-2.5"
            >
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                :class="`bg-${statusState.color}-400`"
              />
              <span
                class="relative inline-flex rounded-full h-2.5 w-2.5"
                :class="`bg-${statusState.color}-500`"
              />
            </span>
            <USkeleton
              v-else
              class="h-2.5 w-2.5 rounded-full"
            />

            <span
              v-if="!isLoading"
              class="text-xs font-mono font-medium"
              :class="`text-${statusState.color}-600 dark:text-${statusState.color}-400`"
            >
              {{ statusState.label }}
            </span>
            <USkeleton
              v-else
              class="h-4 w-24"
            />
          </div>
        </div>

        <div class="mt-4">
          <div class="flex justify-between text-xs mb-1.5">
            <span class="text-neutral-500">Global Uptime</span>
            <span
              v-if="!isLoading"
              class="font-mono font-bold text-neutral-900 dark:text-white"
            >{{ metrics.uptime }}%</span>
            <USkeleton
              v-else
              class="h-4 w-8"
            />
          </div>

          <UProgress
            v-if="!isLoading"
            v-model="metrics.uptime"
            :color="statusState.color"
            size="sm"
          />
          <USkeleton
            v-else
            class="h-2 w-full rounded-full"
          />
        </div>
      </div>

      <div class="grid grid-cols-3 divide-x divide-neutral-200 dark:divide-neutral-800 flex-1">
        <div class="p-4 flex flex-col items-center justify-center text-center group">
          <span class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">Operational</span>
          <div
            v-if="!isLoading"
            class="flex items-center gap-1.5 text-emerald-500"
          >
            <UIcon
              name="i-ph-check-circle-duotone"
              class="w-5 h-5"
            />
            <span class="text-xl font-bold">{{ metrics.up }}</span>
          </div>
          <USkeleton
            v-else
            class="h-6 w-8 mt-1"
          />
        </div>

        <div class="p-4 flex flex-col items-center justify-center text-center">
          <span class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">Down</span>
          <div
            v-if="!isLoading"
            class="flex items-center gap-1.5"
            :class="metrics.down > 0 ? 'text-red-500' : 'text-neutral-400'"
          >
            <UIcon
              name="i-ph-warning-circle-duotone"
              class="w-5 h-5"
            />
            <span class="text-xl font-bold">{{ metrics.down }}</span>
          </div>
          <USkeleton
            v-else
            class="h-6 w-8 mt-1"
          />
        </div>

        <div class="p-4 flex flex-col items-center justify-center text-center">
          <span class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">Maint.</span>
          <div
            v-if="!isLoading"
            class="flex items-center gap-1.5"
            :class="metrics.maintenance > 0 ? 'text-blue-500' : 'text-neutral-400'"
          >
            <UIcon
              name="i-ph-wrench-duotone"
              class="w-5 h-5"
            />
            <span class="text-xl font-bold">{{ metrics.maintenance }}</span>
          </div>
          <USkeleton
            v-else
            class="h-6 w-8 mt-1"
          />
        </div>
      </div>

      <div class="p-2 text-center border-t border-neutral-200 dark:border-neutral-800 mt-auto">
        <UButton
          to="https://go.arthurdanjou.fr/status"
          target="_blank"
          rel="noopener noreferrer"
          variant="link"
          color="neutral"
          size="xs"
          :padded="false"
          class="text-xs hover:text-primary-500"
        >
          View detailed report →
        </UButton>
      </div>
    </UCard>
  </ClientOnly>
</template>
