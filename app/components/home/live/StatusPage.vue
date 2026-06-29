<script lang="ts" setup>
const { data, status, error } = useFetch('/api/ha/monitors', {
  server: false,
  lazy: true
})

const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')
const hasNoData = computed(
  () => !isLoading.value && (!data.value || data.value.total === 0)
)

const metrics = computed(() => {
  if (!data.value) {
    return { up: 0, down: 0, maintenance: 0, total: 0, uptime: 0 }
  }

  return {
    up: data.value.up,
    down: data.value.down,
    maintenance: data.value.maintenance ?? 0,
    total: data.value.total,
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

const pingClass = computed(() => {
  return {
    'bg-neutral-400': statusState.value.color === 'neutral',
    'bg-orange-400': statusState.value.color === 'orange',
    'bg-sky-400': statusState.value.color === 'sky',
    'bg-emerald-400': statusState.value.color === 'emerald'
  }
})

const dotClass = computed(() => {
  return {
    'bg-neutral-500': statusState.value.color === 'neutral',
    'bg-orange-500': statusState.value.color === 'orange',
    'bg-sky-500': statusState.value.color === 'sky',
    'bg-emerald-500': statusState.value.color === 'emerald'
  }
})

const labelClass = computed(() => {
  return {
    'text-neutral-600 dark:text-neutral-400':
      statusState.value.color === 'neutral',
    'text-orange-600 dark:text-orange-400':
      statusState.value.color === 'orange',
    'text-sky-600 dark:text-sky-400':
      statusState.value.color === 'sky',
    'text-emerald-600 dark:text-emerald-400':
      statusState.value.color === 'emerald'
  }
})

const progressColor = computed((): 'emerald' | 'orange' | 'sky' | 'neutral' => {
  if (statusState.value.color === 'emerald') return 'emerald'
  if (statusState.value.color === 'orange') return 'orange'
  if (statusState.value.color === 'sky') return 'sky'
  return 'neutral'
})

const iconName = computed(() => {
  if (statusState.value.color === 'orange') return 'i-heroicons-exclamation-triangle'
  if (statusState.value.color === 'sky') return 'i-heroicons-wrench-screwdriver'
  if (statusState.value.color === 'emerald') return 'i-heroicons-check-circle'
  return 'i-heroicons-question-mark-circle'
})

const iconBgClass = computed(() => ({
  'bg-primary-50 dark:bg-primary-900/30 text-primary-500': statusState.value.color === 'emerald' || statusState.value.color === 'neutral',
  'bg-orange-50 dark:bg-orange-900/30 text-orange-500': statusState.value.color === 'orange',
  'bg-sky-50 dark:bg-sky-900/30 text-sky-500': statusState.value.color === 'sky'
}))

const hoverRingClass = computed(() => ({
  'hover:ring-emerald-500/50': statusState.value.color === 'emerald',
  'hover:ring-orange-500/50': statusState.value.color === 'orange',
  'hover:ring-sky-500/50': statusState.value.color === 'sky',
  'hover:ring-neutral-500/50': statusState.value.color === 'neutral'
}))
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
        :class="hoverRingClass"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div
              class="p-2 rounded-lg flex items-center justify-center"
              :class="iconBgClass"
            >
              <UIcon
                :name="iconName"
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
                :class="pingClass"
              />
              <span
                class="relative inline-flex rounded-full h-2.5 w-2.5"
                :class="dotClass"
              />
            </span>
            <USkeleton
              v-else
              class="h-2.5 w-2.5 rounded-full"
            />

            <span
              v-if="!isLoading"
              class="text-xs font-mono font-medium"
              :class="labelClass"
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
            :color="progressColor"
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
