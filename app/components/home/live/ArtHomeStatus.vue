<script lang="ts" setup>
import type { HAStatus } from '~~/types'

const { data: ha, refresh, pending } = useFetch<HAStatus>('/api/ha/status')
useIntervalFn(refresh, 120_000)

const weatherIcons: Record<string, { icon: string, color: string }> = {
  'sunny': { icon: 'i-ph-sun-duotone', color: 'text-yellow-500' },
  'clear-night': { icon: 'i-ph-moon-stars-duotone', color: 'text-indigo-400' },
  'partlycloudy': { icon: 'i-ph-cloud-sun-duotone', color: 'text-gray-400' },
  'cloudy': { icon: 'i-ph-cloud-duotone', color: 'text-gray-400' },
  'rainy': { icon: 'i-ph-cloud-rain-duotone', color: 'text-blue-500' },
  'pouring': { icon: 'i-ph-cloud-rain-duotone', color: 'text-blue-600' },
  'lightning': { icon: 'i-ph-cloud-lightning-duotone', color: 'text-purple-500' },
  'snowy': { icon: 'i-ph-snowflake-duotone', color: 'text-sky-300' },
  'snowy-rainy': { icon: 'i-ph-cloud-snow-duotone', color: 'text-sky-400' },
  'fog': { icon: 'i-ph-cloud-fog-duotone', color: 'text-slate-400' },
  'windy': { icon: 'i-ph-wind-duotone', color: 'text-teal-500' }
}

const statsCards = computed(() => {
  if (!ha.value) return []

  const weather = ha.value.weather
    ? {
        label: 'Weather',
        value: `${Math.round(ha.value.weather.temperature)}°C`,
        icon:
          weatherIcons[ha.value.weather.condition]?.icon
          ?? 'i-ph-question-duotone',
        color:
          weatherIcons[ha.value.weather.condition]?.color ?? 'text-gray-500'
      }
    : null

  const cards = [
    weather,
    ha.value.isHoliday
      ? {
          label: 'Status',
          value: 'Holiday',
          icon: 'i-ph-palms-duotone',
          color: 'text-amber-500'
        }
      : null,
    ha.value.totalLights != null
      ? {
          label: 'Lighting',
          value: `${ha.value.totalLights}`,
          icon: 'i-ph-lightbulb-duotone',
          color: 'text-yellow-500'
        }
      : null,
    ha.value.totalAutomations != null
      ? {
          label: 'Automations',
          value: `${ha.value.totalAutomations}`,
          icon: 'i-ph-magic-wand-duotone',
          color: 'text-indigo-500'
        }
      : null,
    ha.value.totalScenes != null
      ? {
          label: 'Scenes',
          value: `${ha.value.totalScenes}`,
          icon: 'i-ph-palette-duotone',
          color: 'text-pink-500'
        }
      : null,
    ha.value.totalDomains != null
      ? {
          label: 'Domains',
          value: `${ha.value.totalDomains}`,
          icon: 'i-ph-devices-duotone',
          color: 'text-teal-500'
        }
      : null,
    ha.value.totalEntities != null
      ? {
          label: 'Entities',
          value: `${ha.value.totalEntities}`,
          icon: 'i-ph-database-duotone',
          color: 'text-emerald-500'
        }
      : null,
    ha.value.lxcContainers != null
      ? {
          label: 'LXC',
          value: `${ha.value.lxcContainers}`,
          icon: 'i-ph-hard-drives-duotone',
          color: 'text-orange-500'
        }
      : null,
    ha.value.virtualMachines != null
      ? {
          label: 'VMs',
          value: `${ha.value.virtualMachines}`,
          icon: 'i-ph-desktop-tower-duotone',
          color: 'text-orange-600'
        }
      : null,
    ha.value.totalMediaPlayers != null
      ? {
          label: 'Media Players',
          value: `${ha.value.totalMediaPlayers}`,
          icon: 'i-ph-speaker-high-duotone',
          color: 'text-violet-500'
        }
      : null,
    ha.value.activeMediaPlayers != null
      ? {
          label: 'Now Playing',
          value: `${ha.value.activeMediaPlayers}`,
          icon: 'i-ph-music-notes-duotone',
          color: 'text-pink-500'
        }
      : null,
    ha.value.immichPhotos != null
      ? {
          label: 'Photos',
          value: ha.value.immichPhotos.toLocaleString('en-US'),
          icon: 'i-ph-image-duotone',
          color: 'text-rose-500'
        }
      : null,
    ha.value.immichVideos != null
      ? {
          label: 'Videos',
          value: ha.value.immichVideos.toLocaleString('en-US'),
          icon: 'i-ph-video-camera-duotone',
          color: 'text-fuchsia-500'
        }
      : null,
    ha.value.dnsRequests != null
      ? {
          label: 'DNS Queries',
          value: ha.value.dnsRequests.toLocaleString('en-US'),
          icon: 'i-ph-globe-duotone',
          color: 'text-blue-500'
        }
      : null,
    ha.value.dnsBlocked != null
      ? {
          label: 'DNS Blocked',
          value: ha.value.dnsBlocked.toLocaleString('en-US'),
          icon: 'i-ph-shield-warning-duotone',
          color: 'text-cyan-500'
        }
      : null
  ]

  return cards.filter(Boolean)
})
</script>

<template>
  <ClientOnly>
    <div
      class="grid gap-3 mt-4 mb-2 transition-opacity"
      :class="{ 'opacity-50 pointer-events-none': pending }"
      style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))"
    >
      <UCard
        v-for="card in statsCards"
        :key="card.label"
        :ui="{
          body: { padding: 'p-3' },
          ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
          shadow: 'shadow-sm'
        }"
      >
        <div class="flex flex-col items-center text-center gap-1">
          <UIcon
            :name="card.icon"
            :class="['size-6 mb-1', card.color]"
          />
          <span
            class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold"
          >
            {{ card.label }}
          </span>
          <span class="text-sm font-semibold truncate w-full">
            {{ card.value }}
          </span>
        </div>
      </UCard>
    </div>

    <template #fallback>
      <div
        class="grid gap-3 mt-4"
        style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))"
      >
        <UCard
          v-for="i in 6"
          :key="i"
          :ui="{ body: { padding: 'p-3' } }"
        >
          <div class="flex flex-col items-center gap-2 animate-pulse">
            <div class="size-6 bg-gray-200 dark:bg-gray-800 rounded-full" />
            <div class="h-2 w-10 bg-gray-200 dark:bg-gray-800 rounded" />
            <div class="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </UCard>
      </div>
    </template>
  </ClientOnly>
</template>
