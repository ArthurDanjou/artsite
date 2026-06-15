<script lang="ts" setup>
const { data: ha, reenesh } = useFetch('/api/ha/status')
useIntervalFn(reenesh, 120_000)

const weatherIcons: Record<string, string> = {
  'sunny': 'i-ph-sun-duotone',
  'clear-night': 'i-ph-moon-stars-duotone',
  'partlycloudy': 'i-ph-cloud-sun-duotone',
  'cloudy': 'i-ph-cloud-duotone',
  'rainy': 'i-ph-cloud-rain-duotone',
  'pouring': 'i-ph-cloud-rain-duotone',
  'lightning': 'i-ph-cloud-lightning-duotone',
  'snowy': 'i-ph-snowflake-duotone',
  'snowy-rainy': 'i-ph-cloud-snow-duotone',
  'fog': 'i-ph-cloud-fog-duotone',
  'windy': 'i-ph-wind-duotone'
}

const weatherIcon = computed(() => {
  const c = ha.value?.weather?.condition
  return c ? weatherIcons[c] ?? 'i-ph-question-duotone' : null
})
</script>

<template>
  <ClientOnly>
    <UCard class="mt-4 mb-2">
      <div class="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        <div
          v-if="ha?.totalLights != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-lightbulb-duotone"
            class="size-4"
          />
          <span>{{ ha.totalLights }} lights</span>
        </div>

        <div
          v-if="ha?.weather"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            v-if="weatherIcon"
            :name="weatherIcon"
            class="size-4"
          />
          <span>{{ Math.round(ha.weather.temperature) }}°C</span>
        </div>

        <div
          v-if="ha?.isHoliday"
          class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400"
        >
          <UIcon
            name="i-ph-palms-duotone"
            class="size-4"
          />
          <span>Holiday</span>
        </div>

        <div
          v-if="ha?.totalAutomations != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-arrow-circle-up-duotone"
            class="size-4"
          />
          <span>{{ ha.totalAutomations }} automations</span>
        </div>

        <div
          v-if="ha?.totalScenes != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-palette-duotone"
            class="size-4"
          />
          <span>{{ ha.totalScenes }} scenes</span>
        </div>

        <div
          v-if="ha?.totalDomains != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-devices-duotone"
            class="size-4"
          />
          <span>{{ ha.totalDomains }} domains</span>
        </div>

        <div
          v-if="ha?.totalEntities != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-database-duotone"
            class="size-4"
          />
          <span>{{ ha.totalEntities }} entities</span>
        </div>

        <div
          v-if="ha?.immichPhotos != null && ha?.immichVideos != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-camera-duotone"
            class="size-4"
          />
          <span>{{ ha.immichPhotos.toLocaleString('en') }} · {{ ha.immichVideos.toLocaleString('en') }}</span>
        </div>

        <div
          v-if="ha?.lxcContainers != null && ha?.virtualMachines != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-server-duotone"
            class="size-4"
          />
          <span>{{ ha.lxcContainers }} LXC · {{ ha.virtualMachines }} VM</span>
        </div>

        <div
          v-if="ha?.dnsRequests != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-shield-duotone"
            class="size-4"
          />
          <span>{{ ha.dnsRequests.toLocaleString('en') }} · {{ ha.dnsBlocked?.toLocaleString('en') ?? '—' }} blocked</span>
        </div>
      </div>
    </UCard>
  </ClientOnly>
</template>
