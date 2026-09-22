<script lang="ts" setup>
import { LANG_FLAGS } from '~/utils/locale'

defineProps<{
  title: string
  date: string
  venue: string
  description: string
  slides?: string
  icon?: string
  lang?: string
}>()
</script>

<template>
  <div class="group rounded-lg p-4 transition-colors duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50">
    <div class="flex items-start gap-4">
      <div class="mt-0.5 shrink-0 flex size-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-400/10 transition-colors group-hover:bg-primary-100 dark:group-hover:bg-primary-400/20">
        <UIcon
          :name="icon || 'i-ph-presentation-duotone'"
          class="text-primary size-5"
        />
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-xs text-neutral-500 uppercase tracking-wider font-medium">
          {{ date }}
        </p>
        <div class="flex items-center gap-2 mt-0.5">
          <h3 class="font-semibold text-neutral-900 dark:text-white">
            {{ title }}
          </h3>
          <span
            v-if="lang && LANG_FLAGS[lang]"
            class="text-sm shrink-0"
          >{{ LANG_FLAGS[lang] }}</span>
        </div>
        <p class="text-sm text-neutral-500 italic">
          {{ venue }}
        </p>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
          {{ description }}
        </p>
        <div
          v-if="$slots.tags || slides"
          class="flex flex-wrap items-center gap-2 mt-3"
        >
          <slot name="tags" />
          <UButton
            v-if="slides"
            :to="slides"
            target="_blank"
            variant="subtle"
            color="neutral"
            size="xs"
            icon="i-ph-slideshow-duotone"
            class="shrink-0"
            rel="noopener noreferrer"
          >
            See Slides
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
