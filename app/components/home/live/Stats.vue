<script lang="ts" setup>
import type { Stats } from '~~/types'
import type { ProgressGroupItem } from '@nuxt/ui'
import { usePrecision } from '@vueuse/math'
import { computed } from 'vue'

const { data: stats, pending } = useFetch<Stats>('/api/stats', {
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
</script>

<template>
  <ClientOnly>
    <div
      v-if="pending"
      class="space-y-6"
    >
      <USkeleton class="h-96 w-full rounded-xl" />
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
        <div class="flex items-center gap-3 relative z-10">
          <div
            class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-500 flex items-center justify-center"
          >
            <UIcon
              name="i-ph-chart-bar-duotone"
              class="w-5 h-5"
            />
          </div>
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white">
            Coding Statistics
          </h3>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div
          v-if="topLanguages.length"
          class="space-y-4"
        >
          <h4
            class="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2"
          >
            <UIcon
              name="i-ph-code-block-duotone"
              class="text-emerald-500 w-5 h-5"
            />
            Top Languages
          </h4>
          <UProgressGroup
            :items="languageItems"
            :max="100"
            :ui="{ base: 'gap-px' }"
          >
            <template #item-trailing="{ item }">
              <span class="font-medium">{{ item.value }}%</span>
            </template>
          </UProgressGroup>
        </div>

        <div
          v-if="topEditors.length"
          class="space-y-4"
        >
          <h4
            class="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2"
          >
            <UIcon
              name="i-ph-terminal-window-duotone"
              class="text-blue-500 w-5 h-5"
            />
            Preferred Editors
          </h4>
          <UProgressGroup
            :items="editorItems"
            :max="100"
            :ui="{ base: 'gap-px' }"
          >
            <template #item-trailing="{ item }">
              <span class="font-medium">{{ item.value }}%</span>
            </template>
          </UProgressGroup>
        </div>

        <div
          v-if="topOS.length"
          class="space-y-4"
        >
          <h4
            class="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2"
          >
            <UIcon
              name="i-ph-desktop-duotone"
              class="text-neutral-700 dark:text-neutral-300 w-5 h-5"
            />
            Operating Systems
          </h4>
          <UProgressGroup
            :items="osItems"
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
              class="font-mediumt"
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
