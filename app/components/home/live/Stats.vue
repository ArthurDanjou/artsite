<script lang="ts" setup>
import type { Stats } from '~~/types'
import { usePrecision } from '@vueuse/math'

const { data: stats } = await useAsyncData<Stats>('stats', () => $fetch('/api/stats'))

const startDate = computed(() => new Date(stats.value!.coding.range.start))
const yearsCollected = useTimeAgo(startDate).value
const formattedDate = useDateFormat(startDate, 'MMM DD, YYYY').value

const totalHours = usePrecision((stats.value!.coding.grand_total.total_seconds_including_other_language ?? 0) / 3600, 0)

const topLanguages = computed(() => stats.value!.languages.slice(0, 4))
const topEditors = computed(() => stats.value!.editors.slice(0, 3))
const topOS = computed(() => stats.value!.os.slice(0, 2))
</script>

<template>
  <ClientOnly>
    <div
      v-if="stats"
      class="space-y-6"
    >
      {{ topLanguages }}
      {{ topEditors }}
      {{ topOS }}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UCard>
          <div class="flex items-center gap-4">
            <div class="p-3 bg-primary-200 dark:bg-primary-900 rounded-lg text-primary-500 flex items-center justify-center">
              <UIcon
                name="i-ph-clock-duotone"
                class="w-8 h-8"
              />
            </div>
            <div>
              <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Total Coding Time
              </p>
              <h3 class="text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                {{ totalHours }} <span class="text-lg text-neutral-500 font-normal">hours</span>
              </h3>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-4">
            <div class="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg text-emerald-500 flex items-center justify-center">
              <UIcon
                name="i-ph-calendar-check-duotone"
                class="w-8 h-8"
              />
            </div>
            <div>
              <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Data Collected Since
              </p>
              <div class="flex items-baseline gap-2">
                <h3 class="text-xl font-bold text-neutral-900 dark:text-white">
                  {{ formattedDate }}
                </h3>
                <UBadge
                  color="neutral"
                  variant="soft"
                  size="sm"
                >
                  {{ yearsCollected }}
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="col-span-1 lg:col-span-1 space-y-4">
          <h4 class="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <UIcon
              name="i-ph-code-block-duotone"
              class="text-primary-500 w-5 h-5"
            />
            Top Languages
          </h4>
          <div class="space-y-3">
            <div
              v-for="lang in topLanguages"
              :key="lang.name"
              class="space-y-1"
            >
              <div class="flex justify-between text-xs text-neutral-600 dark:text-neutral-300">
                <span>{{ lang.name }}</span>
                <span>{{ lang.percent }}%</span>
              </div>
              <UProgress
                v-model="lang.percent"
                color="primary"
                size="sm"
              />
            </div>
          </div>
        </div>

        <div class="col-span-1 lg:col-span-1 space-y-4">
          <h4 class="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <UIcon
              name="i-ph-terminal-window-duotone"
              class="text-orange-500 w-5 h-5"
            />
            Preferred Editors
          </h4>
          <div class="space-y-3">
            <div
              v-for="editor in topEditors"
              :key="editor.name"
              class="space-y-1"
            >
              <div class="flex justify-between text-xs text-neutral-600 dark:text-neutral-300">
                <span>{{ editor.name }}</span>
                <span>{{ editor.percent }}%</span>
              </div>
              <UProgress
                v-model="editor.percent"
                color="orange"
                size="sm"
              />
            </div>
          </div>
        </div>

        <div class="col-span-1 lg:col-span-1 space-y-4">
          <h4 class="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <UIcon
              name="i-ph-desktop-duotone"
              class="text-blue-500 w-5 h-5"
            />
            Operating Systems
          </h4>
          <div class="space-y-3">
            <div
              v-for="osItem in topOS"
              :key="osItem.name"
              class="space-y-1"
            >
              <div class="flex justify-between text-xs text-neutral-600 dark:text-neutral-300">
                <span>{{ osItem.name }}</span>
                <span>{{ osItem.percent }}%</span>
              </div>
              <UProgress
                v-model="osItem.percent"
                color="blue"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <USkeleton class="h-24 w-full" />
      <USkeleton class="h-24 w-full" />
    </div>
  </ClientOnly>
</template>
