<script lang="ts" setup>
const { data: ha, refresh } = useFetch('/api/ha/status')
useIntervalFn(refresh, 120_000)

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
          v-if="ha?.currentLights != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-lightbulb-duotone"
            class="size-4"
          />
          <span>{{ ha.currentLights }} / {{ ha.totalLights ?? '—' }} allumée(s)</span>
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
          <span>Vacances</span>
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
          <span>{{ ha.totalScenes }} scènes</span>
        </div>

        <div
          v-if="ha?.totalDomains != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-devices-duotone"
            class="size-4"
          />
          <span>{{ ha.totalDomains }} domaines</span>
        </div>

        <div
          v-if="ha?.totalEntities != null"
          class="flex items-center gap-1.5 text-neutral-500"
        >
          <UIcon
            name="i-ph-database-duotone"
            class="size-4"
          />
          <span>{{ ha.totalEntities }} entités</span>
        </div>
      </div>
    </UCard>
  </ClientOnly>
</template>
