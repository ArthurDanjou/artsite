<script lang="ts" setup>
const { data, status, error, refresh } = useFetch('/api/ha/monitors', {
  server: false,
  lazy: true
})
useLiveRefresh(refresh, 60_000)

const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')
const hasNoData = computed(
  () => !isLoading.value && (!data.value || metrics.value.total === 0)
)

const metrics = computed(() => ({
  total: data.value?.total ?? 0,
  uptime: data.value?.uptime ?? 0,
  down: data.value?.down ?? 0,
  maintenance: data.value?.maintenance ?? 0
}))

const hasDown = computed(() => metrics.value.down > 0)
const hasMaintenance = computed(() => metrics.value.maintenance > 0)

type StatusColor = 'neutral' | 'orange' | 'sky' | 'emerald'

const statusState = computed<{ color: StatusColor, label: string }>(() => {
  if (isLoading.value) return { color: 'neutral', label: 'Checking status...' }
  if (hasNoData.value) return { color: 'neutral', label: 'Status unavailable' }
  if (hasDown.value)
    return { color: 'orange', label: `${metrics.value.down} service${metrics.value.down > 1 ? 's' : ''} down` }
  if (hasMaintenance.value)
    return { color: 'sky', label: `${metrics.value.maintenance} service${metrics.value.maintenance > 1 ? 's' : ''} in maintenance` }
  return { color: 'emerald', label: 'All Systems Operational' }
})

interface StatusTheme {
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
        label: 'text-orange-600 dark:text-orange-400',
        progress: 'orange',
        icon: 'i-ph-warning-duotone',
        iconBg: 'bg-orange-50 dark:bg-orange-900/30 text-orange-500',
        hoverRing: 'hover:ring-orange-500/50'
      }
    case 'sky':
      return {
        label: 'text-sky-600 dark:text-sky-400',
        progress: 'sky',
        icon: 'i-ph-wrench-duotone',
        iconBg: 'bg-sky-50 dark:bg-sky-900/30 text-sky-500',
        hoverRing: 'hover:ring-sky-500/50'
      }
    case 'emerald':
      return {
        label: 'text-emerald-600 dark:text-emerald-400',
        progress: 'emerald',
        icon: 'i-ph-check-circle-duotone',
        iconBg: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500',
        hoverRing: 'hover:ring-emerald-500/50'
      }
    default:
      return {
        label: 'text-neutral-600 dark:text-neutral-400',
        progress: 'neutral',
        icon: 'i-ph-question-duotone',
        iconBg: 'bg-neutral-100 dark:bg-neutral-900/30 text-neutral-500',
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
        <HomeLiveCardHeader
          title="System Status"
          title-size="sm"
          :icon="statusTheme.icon"
          :icon-bg="statusTheme.iconBg"
        >
          <template #right>
            <div class="flex items-center gap-2">
              <USkeleton
                v-if="isLoading"
                class="h-2.5 w-2.5 rounded-full"
              />
              <HomeLiveStatusDot
                v-else
                :color="statusState.color"
                size="sm"
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
          </template>
        </HomeLiveCardHeader>

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
            >{{ metrics.uptime.toFixed(1) }}%</span>
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
