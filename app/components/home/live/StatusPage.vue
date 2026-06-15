<script lang="ts" setup>
const { data, status } = await useAsyncData(
  'home-status',
  () => $fetch('/api/ha/monitors'),
  { lazy: true, dedupe: 'defer' }
)

const isLoading = computed(() => status.value === 'pending')

const metrics = computed(() => {
  if (!data.value) {
    return { up: 0, down: 0, total: 0, uptime: 0 }
  }

  return {
    total: data.value.total,
    uptime: Number(data.value.uptime)
  }
})

const hasDown = computed(() => {
  return data.value ? data.value.down > 0 : false
})

const statusState = computed(() => {
  if (isLoading.value) return { color: 'neutral' as const, label: 'Checking status...' }
  if (hasDown.value) return { color: 'orange' as const, label: `${data.value.down} service(s) degraded` }
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
        </div>
      </div>
    </UCard>
  </ClientOnly>
</template>
