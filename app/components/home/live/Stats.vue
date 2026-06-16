<script lang="ts" setup>
import type { Stats } from '~~/types'
import { usePrecision } from '@vueuse/math'
import { computed } from 'vue'

const { data: stats, pending } = await useAsyncData<Stats>('stats', () =>
  $fetch('/api/stats')
)

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
const formattedDate = useDateFormat(startDate, 'MMM DD, YYYY')

const topLanguages = computed(() => stats.value?.languages.slice(0, 4) ?? [])
const topEditors = computed(() => stats.value?.editors.slice(0, 3) ?? [])
const topOS = computed(() => stats.value?.os.slice(0, 2) ?? [])
</script>

<template>
  <ClientOnly>
    <div
      v-if="pending"
      class="space-y-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <USkeleton class="h-28 w-full rounded-xl" />
        <USkeleton class="h-28 w-full rounded-xl" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <USkeleton class="h-64 w-full rounded-xl" />
        <USkeleton class="h-64 w-full rounded-xl" />
        <USkeleton class="h-64 w-full rounded-xl" />
      </div>
    </div>

    <div
      v-else-if="stats"
      class="space-y-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UCard
          v-if="totalHours"
          class="transition-all duration-200 hover:ring-2 hover:ring-primary-500/50"
        >
          <div class="flex items-center gap-5">
            <div
              class="p-3.5 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400 flex items-center justify-center"
            >
              <UIcon
                name="i-ph-clock-duotone"
                class="w-8 h-8"
              />
            </div>
            <div>
              <p
                class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-1"
              >
                Total Coding Time
              </p>
              <h3
                class="text-3xl font-bold font-mono text-neutral-900 dark:text-white flex items-baseline gap-2"
              >
                {{ totalHours }}
                <span
                  class="text-base font-sans text-neutral-500 font-medium lowercase"
                >heures</span>
              </h3>
            </div>
          </div>
        </UCard>

        <UCard
          v-if="formattedDate && yearsCollected"
          class="transition-all duration-200 hover:ring-2 hover:ring-emerald-500/50"
        >
          <div class="flex items-center gap-5">
            <div
              class="p-3.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 flex items-center justify-center"
            >
              <UIcon
                name="i-ph-calendar-check-duotone"
                class="w-8 h-8"
              />
            </div>
            <div class="w-full">
              <p
                class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-1"
              >
                Data Collected Since
              </p>
              <div class="flex items-center justify-between w-full gap-2">
                <h3 class="text-xl font-bold text-neutral-900 dark:text-white">
                  {{ formattedDate }}
                </h3>
                <UBadge
                  color="emerald"
                  variant="subtle"
                  size="sm"
                  class="font-medium"
                >
                  {{ yearsCollected }}
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-if="topLanguages.length">
          <template #header>
            <h4
              class="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2"
            >
              <UIcon
                name="i-ph-code-block-duotone"
                class="text-red-500 w-5 h-5"
              />
              Top Languages
            </h4>
          </template>
          <div class="space-y-4">
            <div
              v-for="lang in topLanguages"
              :key="lang.name"
              class="space-y-1.5"
            >
              <div
                class="flex justify-between text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                <span>{{ lang.name }}</span>
                <span class="text-neutral-500">{{ lang.percent }}%</span>
              </div>
              <UProgress
                v-model="lang.percent"
                color="red"
                size="sm"
              />
            </div>
          </div>
        </UCard>

        <UCard v-if="topEditors.length">
          <template #header>
            <h4
              class="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2"
            >
              <UIcon
                name="i-ph-terminal-window-duotone"
                class="text-green-500 w-5 h-5"
              />
              Preferred Editors
            </h4>
          </template>
          <div class="space-y-4">
            <div
              v-for="editor in topEditors"
              :key="editor.name"
              class="space-y-1.5"
            >
              <div
                class="flex justify-between text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                <span>{{ editor.name }}</span>
                <span class="text-neutral-500">{{ editor.percent }}%</span>
              </div>
              <UProgress
                v-model="editor.percent"
                color="green"
                size="sm"
              />
            </div>
          </div>
        </UCard>

        <UCard v-if="topOS.length">
          <template #header>
            <h4
              class="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2"
            >
              <UIcon
                name="i-ph-desktop-duotone"
                class="text-blue-500 w-5 h-5"
              />
              Operating Systems
            </h4>
          </template>
          <div class="space-y-4">
            <div
              v-for="osItem in topOS"
              :key="osItem.name"
              class="space-y-1.5"
            >
              <div
                class="flex justify-between text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                <span>{{ osItem.name }}</span>
                <span class="text-neutral-500">{{ osItem.percent }}%</span>
              </div>
              <UProgress
                v-model="osItem.percent"
                color="blue"
                size="sm"
              />
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </ClientOnly>
</template>
