<script lang="ts" setup>
const now = useNow()
const timeStr = computed(() => {
  return useDateFormat(now, 'HH:mm:ss').value
})
const dateStr = computed(() => {
  return useDateFormat(now, 'dddd, MMMM D, YYYY').value
})

const isNight = computed(() => {
  const h = now.value.getHours()
  return h < 7 || h >= 21
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
              <span class="mx-1.5 text-neutral-400">•</span>
              <span>{{ isNight ? '🌙 Night mode' : '☀️ Daytime' }}</span>
              <span class="mx-1.5 text-neutral-400">•</span>
              <span>📍 Polytechnique, Palaiseau</span>
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
