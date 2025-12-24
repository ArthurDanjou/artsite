<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'

const { education } = await useContent()
const { width } = useWindowSize()

const orientation = computed<'vertical' | 'horizontal'>(() =>
  width.value >= 768 ? 'horizontal' : 'vertical'
)

const formatDate = (start?: string, end?: string, duration?: string) => {
  if (!start) return 'N/A'

  const startYear = new Date(start).getFullYear()
  const endYear = end ? new Date(end).getFullYear() : 'Present'
  const durationText = duration ? `(${duration})` : ''

  if (startYear === endYear) {
    return `${startYear} ${durationText}`
  }
  return `${startYear} - ${endYear} ${durationText}`
}

const items = computed<TimelineItem[]>(() => {
  if (!education) return []

  return [...education]
    .sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''))
    .map(item => ({
      title: item.title || 'Degree',
      description: item.institution || '',
      date: formatDate(item.startDate, item.endDate, item.duration),
      icon: item.icon || 'i-ph-graduation-cap-duotone'
    }))
})
</script>

<template>
  <ClientOnly>
    <div class="w-full flex justify-center">
      <UTimeline
        :orientation="orientation"
        :items="items"
        :default-value="items.length - 1"
        active-color="primary"
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
