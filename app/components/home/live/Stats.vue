<script lang="ts" setup>
import type { Stats } from '~~/types'
import type { ProgressGroupItem } from '@nuxt/ui'
import { usePrecision } from '@vueuse/math'

const { data: stats, pending, error } = useFetch<Stats>('/api/stats', {
  server: false,
  lazy: true
})

const startDate = computed(
  () => new Date(stats.value?.coding?.range?.start ?? new Date())
)

const rawHours = computed(() => {
  const seconds
    = stats.value?.coding?.grand_total?.total_seconds_including_other_language
      ?? 0
  return seconds / 3600
})

const totalHours = usePrecision(rawHours, 0)
const yearsCollected = useTimeAgo(startDate)
const formattedDate = useDateFormat(startDate, 'MMMM DD, YYYY', { locales: 'en-US' })

const topLanguages = computed(() => stats.value?.languages.slice(0, 3) ?? [])
const topEditors = computed(() => stats.value?.editors.slice(0, 3) ?? [])
const topOS = computed(() => stats.value?.os.slice(0, 2) ?? [])

const languageItems = computed<ProgressGroupItem[]>(() =>
  topLanguages.value.map(lang => ({
    label: lang.name,
    value: lang.percent,
    color: getLanguageColor(lang.name)
  }))
)

const editorItems = computed<ProgressGroupItem[]>(() =>
  topEditors.value.map(editor => ({
    label: editor.name,
    value: editor.percent,
    color: getEditorColor(editor.name)
  }))
)

const osItems = computed<ProgressGroupItem[]>(() =>
  topOS.value.map(os => ({
    label: os.name,
    value: os.percent,
    color: getOSColor(os.name)
  }))
)

const statColumns = computed(() => [
  {
    title: 'Top Languages',
    icon: 'i-ph-code-block-duotone',
    color: 'text-emerald-500',
    items: languageItems.value
  },
  {
    title: 'Preferred Editors',
    icon: 'i-ph-terminal-window-duotone',
    color: 'text-blue-500',
    items: editorItems.value
  },
  {
    title: 'Operating Systems',
    icon: 'i-ph-desktop-duotone',
    color: 'text-neutral-700 dark:text-neutral-300',
    items: osItems.value
  }
].filter(column => column.items.length))
</script>

<template>
  <ClientOnly>
    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      icon="i-ph-warning-circle-duotone"
      title="Coding stats unreachable"
      description="The stats API returned an error. Check the worker logs for details."
      class="mb-4"
    />

    <div
      v-else-if="pending"
      class="space-y-6"
    >
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <USkeleton class="w-9 h-9 rounded-lg" />
            <USkeleton class="h-5 w-40" />
          </div>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="i in 3"
            :key="i"
            class="space-y-4"
          >
            <USkeleton class="h-5 w-32" />
            <div class="space-y-2.5">
              <USkeleton
                v-for="j in 3"
                :key="j"
                class="h-2.5 w-full"
              />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <UCard
      v-else-if="stats"
      class="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-neutral-300/50 dark:hover:ring-neutral-700/50 group"
      :ui="{
        body: { padding: 'sm:p-6' },
        header: { padding: 'sm:px-6 sm:py-4' },
        footer: {
          padding: 'sm:px-6 sm:py-4',
          background: 'bg-neutral-50 dark:bg-neutral-900/50'
        }
      }"
    >
      <div
        class="absolute -right-8 -top-8 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors duration-300 pointer-events-none"
      />

      <template #header>
        <HomeLiveCardHeader
          title="Coding Statistics"
          icon="i-ph-chart-bar-duotone"
          class="relative z-10"
        />
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div
          v-for="column in statColumns"
          :key="column.title"
          class="space-y-4"
        >
          <h4
            class="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2"
          >
            <UIcon
              :name="column.icon"
              :class="[column.color, 'w-5 h-5']"
            />
            {{ column.title }}
          </h4>
          <UProgressGroup
            :items="column.items"
            :max="100"
            :ui="{ base: 'gap-px' }"
          >
            <template #item-trailing="{ item }">
              <span class="font-medium">{{ item.value }}%</span>
            </template>
          </UProgressGroup>
        </div>
      </div>

      <template #footer>
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10"
        >
          <div
            class="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm"
          >
            <div
              class="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400"
            >
              <UIcon
                name="i-ph-calendar-plus-duotone"
                class="w-4 h-4 opacity-70"
              />
              <span>Tracking since {{ formattedDate }}</span>
            </div>

            <UBadge
              color="emerald"
              variant="subtle"
              size="xs"
              class="font-medium"
            >
              {{ yearsCollected }}
            </UBadge>

            <span
              class="hidden sm:inline text-neutral-300 dark:text-neutral-700"
            >&bull;</span>

            <div class="flex items-center gap-1.5">
              <UIcon
                name="i-ph-clock-duotone"
                class="w-4 h-4 text-primary-500"
              />
              <span class="font-bold text-neutral-900 dark:text-white">{{
                totalHours
              }}</span>
              <span class="text-neutral-500 dark:text-neutral-400">hours logged</span>
            </div>
          </div>

          <a
            href="https://wakatime.com"
            target="_blank"
            rel="noopener noreferrer"
            class="group/link flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors shrink-0"
          >
            <span>Powered by WakaTime</span>
            <UIcon
              name="i-ph-arrow-up-right"
              class="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        </div>
      </template>
    </UCard>
  </ClientOnly>
</template>
