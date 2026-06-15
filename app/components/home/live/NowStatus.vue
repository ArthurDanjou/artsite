<script lang="ts" setup>
const now = useNow()
const timeStr = computed(() => useDateFormat(now, 'HH:mm:ss').value)
const dateStr = computed(() => useDateFormat(now, 'dddd, MMMM D, YYYY').value)

const { data: ha, refresh } = useFetch('/api/ha/status')
useIntervalFn(refresh, 60_000)

const weatherText = computed(() => {
  const w = ha.value?.weather
  if (!w) return null

  const icons: Record<string, string> = {
    'sunny': '☀️',
    'clear-night': '🌙',
    'partlycloudy': '⛅',
    'cloudy': '☁️',
    'rainy': '🌧️',
    'pouring': '🌧️',
    'lightning': '⛈️',
    'snowy': '❄️',
    'snowy-rainy': '🌨️',
    'fog': '🌫️',
    'windy': '💨'
  }

  const icon = icons[w.condition] ?? ''
  if (typeof w.temperature !== 'number') return icon || null

  return `${icon} ${Math.round(w.temperature)}°C`.trim()
})

const locationText = computed(() => {
  const loc = ha.value?.location
  if (loc === 'Polytechnique') return '📍 Polytechnique, Palaiseau'
  if (loc === 'Dauphine') return '📍 Dauphine, Paris'
  if (loc === 'Maison Boulogne') return '🏠 Boulogne-Billancourt'
  return '📍 Palaiseau'
})
</script>

<template>
  <ClientOnly>
    <UCard class="mt-4 mb-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400" />
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </div>
          <div>
            <p class="text-xs text-neutral-500 uppercase tracking-wider font-medium">
              Live Status — {{ dateStr }}
            </p>
            <p class="text-sm text-neutral-700 dark:text-neutral-300">
              <span class="font-mono">{{ timeStr }}</span>
              <template v-if="weatherText">
                <span class="mx-1.5 text-neutral-400">•</span>
                <span>{{ weatherText }}</span>
              </template>
              <span class="mx-1.5 text-neutral-400">•</span>
              <span>{{ locationText }}</span>
            </p>
          </div>
        </div>
        <UBadge
          color="neutral"
          variant="soft"
          size="sm"
        >
          <UIcon
            name="i-ph-clock-duotone"
            class="mr-1"
          />
          Live
        </UBadge>
      </div>
    </UCard>
  </ClientOnly>
</template>
