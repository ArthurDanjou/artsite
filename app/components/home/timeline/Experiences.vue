<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'

const { experiences } = await useContent()

const orientation = useTimelineOrientation()

const items = computed<TimelineItem[]>(() => {
  if (!experiences) return []

  return [...experiences]
    .sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''))
    .map(item => ({
      title: item.title || 'Role',
      description: item.company || 'Freelance',
      date: formatTimelineDate(item.startDate, item.endDate, item.duration),
      icon: item.icon || 'i-ph-briefcase-duotone'
    }))
})
</script>

<template>
  <ClientOnly>
    <div class="w-full flex justify-center">
      <UTimeline
        :orientation="orientation"
        :items="items ?? []"
        :default-value="items.length || 0"
        size="lg"
        color="neutral"
        class="w-full max-w-5xl"
      />
    </div>

    <template #fallback>
      <div class="flex flex-col gap-8 w-full max-w-5xl mx-auto pl-4 border-l border-neutral-200 dark:border-neutral-800">
        <div
          v-for="i in 3"
          :key="i"
          class="space-y-2"
        >
          <USkeleton class="h-4 w-1/4" />
          <USkeleton class="h-4 w-1/2" />
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
