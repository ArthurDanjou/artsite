<script lang="ts" setup>
import type { HAStatus, StatsCard } from '~~/types'

const { data: ha, refresh, pending, error } = useFetch<HAStatus>('/api/ha/status', {
  server: false,
  lazy: true
})
useLiveRefresh(refresh, 120_000)

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

interface StatCardConfig {
  label: string
  icon: string
  color: string
  value: (s: HAStatus) => string | null
}

const statCardConfigs: StatCardConfig[] = [
  { label: 'Status', icon: 'i-ph-palms-duotone', color: 'text-amber-500', value: s => (s.isHoliday ? 'Holiday' : null) },
  { label: 'Lighting', icon: 'i-ph-lightbulb-duotone', color: 'text-yellow-500', value: s => s.totalLights?.toString() ?? null },
  { label: 'Automations', icon: 'i-ph-magic-wand-duotone', color: 'text-indigo-500', value: s => s.totalAutomations?.toString() ?? null },
  { label: 'Scenes', icon: 'i-ph-palette-duotone', color: 'text-pink-500', value: s => s.totalScenes?.toString() ?? null },
  { label: 'Domains', icon: 'i-ph-devices-duotone', color: 'text-teal-500', value: s => s.totalDomains?.toString() ?? null },
  { label: 'Entities', icon: 'i-ph-database-duotone', color: 'text-emerald-500', value: s => s.totalEntities?.toString() ?? null },
  { label: 'LXC', icon: 'i-ph-hard-drives-duotone', color: 'text-orange-500', value: s => s.lxcContainers?.toString() ?? null },
  { label: 'VMs', icon: 'i-ph-desktop-tower-duotone', color: 'text-orange-600', value: s => s.virtualMachines?.toString() ?? null },
  { label: 'Players', icon: 'i-ph-speaker-high-duotone', color: 'text-violet-500', value: s => s.totalMediaPlayers?.toString() ?? null },
  { label: 'Now Playing', icon: 'i-ph-music-notes-duotone', color: 'text-pink-500', value: s => s.activeMediaPlayers?.toString() ?? null },
  { label: 'Photos', icon: 'i-ph-image-duotone', color: 'text-rose-500', value: s => s.immichPhotos?.toLocaleString('en-US') ?? null },
  { label: 'Videos', icon: 'i-ph-video-camera-duotone', color: 'text-fuchsia-500', value: s => s.immichVideos?.toLocaleString('en-US') ?? null },
  { label: 'DNS Queries', icon: 'i-ph-globe-duotone', color: 'text-blue-500', value: s => s.dnsRequests?.toLocaleString('en-US') ?? null },
  { label: 'DNS Blocked', icon: 'i-ph-shield-warning-duotone', color: 'text-cyan-500', value: s => s.dnsBlocked?.toLocaleString('en-US') ?? null }
]

const statsCards = computed<StatsCard[]>(() => {
  if (!ha.value) return []

  const cards: (StatsCard | null)[] = []

  if (ha.value.weather) {
    cards.push({
      label: 'Weather',
      value: `${Math.round(ha.value.weather.temperature)}°C`,
      icon: weatherIcons[ha.value.weather.condition]?.icon
        ?? 'i-ph-question-duotone',
      color: weatherIcons[ha.value.weather.condition]?.color ?? 'text-gray-500'
    })
  }

  for (const config of statCardConfigs) {
    const value = config.value(ha.value)
    if (value !== null) {
      cards.push({
        label: config.label,
        value,
        icon: config.icon,
        color: config.color
      })
    }
  }

  return cards.filter((c): c is StatsCard => c !== null)
})

const ringColorMap: Record<string, string> = {
  'text-yellow-500': 'hover:ring-yellow-500/50',
  'text-indigo-400': 'hover:ring-indigo-400/50',
  'text-indigo-500': 'hover:ring-indigo-500/50',
  'text-gray-400': 'hover:ring-gray-400/50',
  'text-gray-500': 'hover:ring-gray-500/50',
  'text-blue-500': 'hover:ring-blue-500/50',
  'text-blue-600': 'hover:ring-blue-600/50',
  'text-purple-500': 'hover:ring-purple-500/50',
  'text-sky-300': 'hover:ring-sky-300/50',
  'text-sky-400': 'hover:ring-sky-400/50',
  'text-slate-400': 'hover:ring-slate-400/50',
  'text-teal-500': 'hover:ring-teal-500/50',
  'text-amber-500': 'hover:ring-amber-500/50',
  'text-pink-500': 'hover:ring-pink-500/50',
  'text-emerald-500': 'hover:ring-emerald-500/50',
  'text-orange-500': 'hover:ring-orange-500/50',
  'text-orange-600': 'hover:ring-orange-600/50',
  'text-violet-500': 'hover:ring-violet-500/50',
  'text-rose-500': 'hover:ring-rose-500/50',
  'text-fuchsia-500': 'hover:ring-fuchsia-500/50',
  'text-cyan-500': 'hover:ring-cyan-500/50'
}
</script>

<template>
  <ClientOnly>
    <div
      v-if="statsCards.length"
      class="grid gap-3 mt-4 mb-2 transition-opacity"
      :class="{ 'opacity-50 pointer-events-none': pending }"
      style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))"
    >
      <UCard
        v-for="card in statsCards"
        :key="card.label"
        :class="[
          'transition-all duration-200 hover:ring-2',
          ringColorMap[card.color]
        ]"
        :ui="{
          body: { padding: 'p-2' },
          ring: 'ring-2 ring-gray-200 dark:ring-gray-800',
          shadow: 'shadow-sm'
        }"
      >
        <div class="flex flex-col items-center text-center gap-1">
          <UIcon
            :name="card.icon"
            :class="['size-8', card.color]"
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

    <UAlert
      v-else-if="error"
      color="red"
      variant="soft"
      icon="i-ph-warning-circle-duotone"
      title="Home Assistant unreachable"
      description="The telemetry API returned an error. Check the worker logs for details."
      class="mt-4 mb-2"
    />

    <UAlert
      v-else-if="!pending"
      color="neutral"
      variant="soft"
      icon="i-ph-info-duotone"
      title="No telemetry data"
      description="Home Assistant responded but returned no metrics."
      class="mt-4 mb-2"
    />

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
