<script lang="ts" setup>
import type { HAMediaResponse } from '~~/types'

const { data, refresh, pending } = useFetch<HAMediaResponse>('/api/ha/media', {
  server: false,
  lazy: true
})
useIntervalFn(refresh, 15_000)

const nowPlaying = computed(() => data.value?.nowPlaying ?? null)
const isPlaying = computed(() => !!nowPlaying.value)

const statusLabel = computed(() => isPlaying.value ? 'Now Playing' : 'Idle')

const hoverRingClass = computed(() => ({
  'hover:ring-pink-500/50': isPlaying.value,
  'hover:ring-neutral-500/30': !isPlaying.value
}))

const hasArtwork = computed(() => !!nowPlaying.value?.artwork)
</script>

<template>
  <ClientOnly>
    <UCard
      v-if="data"
      class="h-full flex flex-col transition-all duration-200 hover:ring-2"
      :class="hoverRingClass"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative flex h-3 w-3">
            <span
              v-if="isPlaying"
              class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-pink-400"
            />
            <span
              class="relative inline-flex rounded-full h-3 w-3 transition-colors duration-300"
              :class="isPlaying ? 'bg-pink-500' : 'bg-neutral-400'"
            />
          </div>
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {{ statusLabel }}
          </span>
        </div>
        <div class="p-2 rounded-lg bg-pink-50 dark:bg-pink-900/30 text-pink-500 flex items-center justify-center">
          <UIcon
            name="i-ph-music-notes-duotone"
            class="w-6 h-6 opacity-80"
          />
        </div>
      </div>

      <!-- Playing state -->
      <div
        v-if="nowPlaying"
        class="flex gap-4 mt-3 pl-6 border-l-2 border-pink-100 dark:border-pink-900/30 ml-1.5"
      >
        <div class="shrink-0">
          <img
            v-if="hasArtwork"
            :src="nowPlaying.artwork!"
            :alt="nowPlaying.title ?? 'cover'"
            class="w-20 h-20 rounded-lg object-cover shadow-sm bg-neutral-100 dark:bg-neutral-800"
            loading="lazy"
            @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
          >
          <div
            v-else
            class="w-20 h-20 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
          >
            <UIcon
              name="i-ph-vinyl-record-duotone"
              class="w-10 h-10 text-neutral-400"
            />
          </div>
        </div>

        <div class="flex-1 min-w-0 flex flex-col justify-center">
          <h3 class="font-semibold text-neutral-900 dark:text-white truncate text-sm leading-tight">
            {{ nowPlaying.title }}
          </h3>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 truncate">
            {{ nowPlaying.artist ?? 'Unknown artist' }}
          </p>
          <p
            v-if="nowPlaying.album"
            class="text-xs text-neutral-400 dark:text-neutral-500 truncate mt-0.5"
          >
            {{ nowPlaying.album }}
          </p>
          <div class="flex items-center gap-1.5 mt-1.5 text-xs text-neutral-400">
            <UIcon
              name="i-ph-speaker-high-duotone"
              class="w-3.5 h-3.5 shrink-0"
            />
            <span class="truncate">{{ nowPlaying.friendly_name }}</span>
            <span
              v-if="nowPlaying.source"
              class="hidden sm:inline truncate"
            >• {{ nowPlaying.source }}</span>
          </div>
        </div>
      </div>

      <!-- Idle state -->
      <div
        v-else
        class="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 pl-6 border-l-2 border-neutral-200 dark:border-neutral-800 ml-1.5 mt-3"
      >
        <UIcon
          name="i-ph-pause-circle-duotone"
          class="w-4 h-4 shrink-0"
        />
        <p>No music playing.</p>
      </div>
    </UCard>

    <UCard v-else-if="pending">
      <div class="flex items-center gap-3">
        <USkeleton class="h-3 w-3 rounded-full" />
        <div class="space-y-2 flex-1">
          <USkeleton class="h-4 w-1/3" />
          <USkeleton class="h-3 w-2/3" />
        </div>
      </div>
      <div class="flex gap-4 mt-4">
        <USkeleton class="w-20 h-20 rounded-lg" />
        <div class="space-y-2 flex-1">
          <USkeleton class="h-4 w-3/4" />
          <USkeleton class="h-3 w-1/2" />
          <USkeleton class="h-3 w-1/3" />
        </div>
      </div>
    </UCard>

    <template #fallback>
      <UCard>
        <div class="flex items-center gap-3">
          <USkeleton class="h-3 w-3 rounded-full" />
          <div class="space-y-2 flex-1">
            <USkeleton class="h-4 w-1/3" />
            <USkeleton class="h-3 w-2/3" />
          </div>
        </div>
      </UCard>
    </template>
  </ClientOnly>
</template>
