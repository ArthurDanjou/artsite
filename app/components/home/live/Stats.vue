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

// Couleurs sémantiques par technologie — mapping par nom (pas par index)
function getLanguageColor(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('vue')) return 'var(--color-emerald-500)' // Vue.js — vert
  if (n.includes('typescript') || n === 'ts') return 'var(--color-blue-500)' // TS — bleu
  if (n.includes('python')) return 'var(--color-amber-500)' // Python — jaune/ambre
  if (n.includes('javascript') || n === 'js') return 'var(--color-yellow-400)'
  if (n.includes('php')) return 'var(--color-violet-500)'
  if (n.includes('css')) return 'var(--color-pink-500)'
  if (n.includes('html')) return 'var(--color-orange-500)'
  if (n.includes('rust')) return 'var(--color-orange-600)'
  if (n.includes('go')) return 'var(--color-cyan-500)'
  return 'var(--color-red-500)'
}

function getEditorColor(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('vs code') || n.includes('visual studio code') || n === 'vscode') return 'var(--color-blue-500)' // VS Code — bleu
  if (n.includes('webstorm')) return 'var(--color-amber-500)' // WebStorm — jaune/ambre JetBrains
  if (n.includes('intellij')) return 'var(--color-violet-500)' // IntelliJ — violet
  if (n.includes('cursor')) return 'var(--color-neutral-800)'
  if (n.includes('zed')) return 'var(--color-emerald-600)'
  if (n.includes('positron')) return 'var(--color-teal-500)'
  if (n.includes('pycharm')) return 'var(--color-green-600)'
  return 'var(--color-sky-500)'
}

function getOSColor(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('mac') || n.includes('darwin') || n.includes('macos')) return 'var(--color-neutral-700)' // Mac — gris Alu
  if (n.includes('windows') || n.includes('win')) return 'var(--color-blue-500)' // Windows — bleu
  if (n.includes('linux')) return 'var(--color-orange-500)'
  return 'var(--color-sky-500)'
}

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
