<script lang="ts" setup>
const { data, status, error, refresh } = useFetch('/api/ha/monitors', {
  server: false,
  lazy: true
})
useIntervalFn(refresh, 60_000)

const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')
const hasNoData = computed(
  () => !isLoading.value && (!data.value || metrics.value.total === 0)
)

const metrics = computed(() => {
  if (!data.value) {
    return { up: 0, down: 0, maintenance: 0, total: 0, uptime: 0 }
  }

  const total = data.value.up
    + data.value.down
    + (data.value.degraded ?? 0)
    + (data.value.maintenance ?? 0)

  return {
    up: data.value.up,
    down: data.value.down,
    maintenance: data.value.maintenance ?? 0,
    total,
    uptime: Number(data.value.uptime)
  }
})

const hasDown = computed(() => metrics.value.down > 0)
const hasMaintenance = computed(() => metrics.value.maintenance > 0)

const statusState = computed(() => {
  if (isLoading.value) return { color: 'neutral', label: 'Checking status...' }
  if (hasNoData.value) return { color: 'neutral', label: 'Status unavailable' }
  if (hasDown.value)
    return { color: 'orange', label: `${metrics.value.down} service${metrics.value.down > 1 ? 's' : ''} degraded` }
  if (hasMaintenance.value)
    return { color: 'sky', label: `${metrics.value.maintenance} service${metrics.value.maintenance > 1 ? 's' : ''} in maintenance` }
  return { color: 'emerald', label: 'All Systems Operational' }
})

interface StatusTheme {
  ping: string
  dot: string
  label: string
  progress: 'emerald' | 'orange' | 'sky' | 'neutral'
  icon: string
  iconBg: string
  hoverRing: string
}

const statusTheme = computed<StatusTheme>(() => {
  switch (statusState.value.color) {
    case 'orange':
      return {
        ping: 'bg-orange-400',
        dot: 'bg-orange-500',
        label: 'text-orange-600 dark:text-orange-400',
        progress: 'orange',
        icon: 'i-heroicons-exclamation-triangle',
        iconBg: 'bg-orange-50 dark:bg-orange-900/30 text-orange-500',
        hoverRing: 'hover:ring-orange-500/50'
      }
    case 'sky':
      return {
        ping: 'bg-sky-400',
        dot: 'bg-sky-500',
        label: 'text-sky-600 dark:text-sky-400',
        progress: 'sky',
        icon: 'i-heroicons-wrench-screwdriver',
        iconBg: 'bg-sky-50 dark:bg-sky-900/30 text-sky-500',
        hoverRing: 'hover:ring-sky-500/50'
      }
    case 'emerald':
      return {
        ping: 'bg-emerald-400',
        dot: 'bg-emerald-500',
        label: 'text-emerald-600 dark:text-emerald-400',
        progress: 'emerald',
        icon: 'i-heroicons-check-circle',
        iconBg: 'bg-primary-50 dark:bg-primary-900/30 text-primary-500',
        hoverRing: 'hover:ring-emerald-500/50'
      }
    default:
      return {
        ping: 'bg-neutral-400',
        dot: 'bg-neutral-500',
        label: 'text-neutral-600 dark:text-neutral-400',
        progress: 'neutral',
        icon: 'i-heroicons-question-mark-circle',
        iconBg: 'bg-primary-50 dark:bg-primary-900/30 text-primary-500',
        hoverRing: 'hover:ring-neutral-500/50'
      }
  }
})
</script>

<template>
  <ClientOnly>
    <NuxtLink
      v-if="data && !hasNoData"
      to="https://go.arthurdanjou.fr/status"
      target="_blank"
    >
      <UCard
        class="h-full flex flex-col overflow-hidden transition-all duration-200 hover:ring-2"
        :class="statusTheme.hoverRing"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div
              class="p-2 rounded-lg flex items-center justify-center"
              :class="statusTheme.iconBg"
            >
              <UIcon
                :name="statusTheme.icon"
                class="size-6"
              />
            </div>
            <h3 class="font-bold text-neutral-900 dark:text-white text-sm">
              System Status
            </h3>
          </div>

          <div class="flex items-center gap-2">
            <span
              v-if="!isLoading"
              class="relative flex h-2.5 w-2.5"
            >
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                :class="statusTheme.ping"
              />
              <span
                class="relative inline-flex rounded-full h-2.5 w-2.5"
                :class="statusTheme.dot"
              />
            </span>
            <USkeleton
              v-else
              class="h-2.5 w-2.5 rounded-full"
            />

            <span
              v-if="!isLoading"
              class="text-xs font-mono font-medium"
              :class="statusTheme.label"
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

          <div class="flex justify-between text-xs mb-4">
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
            :model-value="metrics.uptime"
            :color="statusTheme.progress"
            size="sm"
          />
        </div>
      </UCard>
    </NuxtLink>

    <UAlert
      v-else-if="error"
      color="red"
      variant="soft"
      icon="i-ph-warning-circle-duotone"
      title="Status monitor unreachable"
      description="The status API returned an error. Check the worker logs for details."
    />

    <UAlert
      v-else-if="hasNoData"
      color="neutral"
      variant="soft"
      icon="i-ph-info-duotone"
      title="No status data"
      description="No monitors were returned by Home Assistant."
    />

    <USkeleton
      v-else-if="isLoading"
      class="h-40 w-full rounded-xl"
    />
  </ClientOnly>
</template>
