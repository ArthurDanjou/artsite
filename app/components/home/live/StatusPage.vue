<script lang="ts" setup>
import type { StatusPageData } from '~~/types'

const { data, status } = await useAsyncData<StatusPageData>(
  'home-status',
  () => $fetch('/api/status-page'),
  { lazy: true, dedupe: 'defer' }
)

const isLoading = computed(() => status.value === 'pending')

const metrics = computed(() => {
  if (!data.value || !data.value.publicGroupList) {
    return { up: 0, down: 0, maintenance: 0, total: 0, uptime: 0 }
  }

  let upCount = 0
  let totalCount = 0

  data.value.publicGroupList.forEach((group) => {
    group.monitorList.forEach((monitor) => {
      totalCount++
      const isUp = (monitor as unknown as { status: number }).status !== 0
      if (isUp) upCount++
    })
  })

  const uptimePercent = totalCount > 0 ? ((upCount / totalCount) * 100).toFixed(1) : '0.0'

  return {
    total: totalCount,
    uptime: Number(uptimePercent)
  }
})

const statusState = computed(() => {
  if (isLoading.value) return { color: 'neutral' as const, label: 'Checking status...' }
  return { color: 'emerald' as const, label: 'All Systems Operational' }
})
</script>

<template>
  <ClientOnly>
    <UCard
      v-if="data"
      class="h-full flex flex-col overflow-hidden"
    >
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

        <div class="mt-4 space-y-3">
          <div class="flex justify-between text-xs">
            <span class="text-neutral-500">Monitored Services</span>
            <span
              v-if="!isLoading"
              class="font-mono font-bold text-neutral-900 dark:text-white"
            >{{ metrics.total }}</span>
            <USkeleton
              v-else
              class="h-4 w-6"
            />
          </div>

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
