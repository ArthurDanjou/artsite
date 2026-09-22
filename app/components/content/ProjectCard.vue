<script lang="ts" setup>
import { LANG_FLAGS } from '~/utils/locale'

defineProps<{
  title: string
  description: string
  icon?: string
  tags?: string[]
  favorite?: boolean
  status?: string
  to: string
  lang?: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-label="`Open project: ${title}`"
    class="group block h-full rounded-lg p-4 transition-colors duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
  >
    <div class="flex items-start gap-4">
      <div class="mt-0.5 shrink-0 flex size-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-400/10">
        <UIcon
          :name="icon || 'i-ph-folder-duotone'"
          class="text-primary size-5"
        />
      </div>
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <h3 class="font-semibold text-neutral-900 dark:text-white line-clamp-1">
            {{ title }}
          </h3>
          <span
            v-if="lang && LANG_FLAGS[lang]"
            class="text-sm shrink-0"
          >{{ LANG_FLAGS[lang] }}</span>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5 line-clamp-3">
          {{ description }}
        </p>
        <div class="flex flex-wrap items-center gap-2 mt-3">
          <div
            v-if="tags?.length"
            class="flex flex-wrap gap-1.5"
          >
            <UBadge
              v-for="tag in tags"
              :key="tag"
              color="neutral"
              variant="outline"
              size="xs"
            >
              {{ tag }}
            </UBadge>
          </div>
          <UBadge
            v-if="favorite"
            color="amber"
            variant="subtle"
            size="sm"
            icon="i-ph-star-four-duotone"
          />
          <UBadge
            v-if="status === 'Active'"
            color="blue"
            variant="soft"
            size="sm"
            icon="i-ph-hourglass-duotone"
          />
          <UBadge
            v-if="status === 'Archived'"
            color="gray"
            variant="soft"
            size="sm"
            icon="i-ph-archive-duotone"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
