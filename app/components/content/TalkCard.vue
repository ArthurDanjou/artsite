<script lang="ts" setup>
defineProps<{
  title: string
  date: string
  venue: string
  description: string
  slides?: string
  icon?: string
  lang?: string
}>()

const flags: Record<string, string> = {
  fr: '🇫🇷',
  en: '🇬🇧'
}
</script>

<template>
  <UCard>
    <div class="flex items-start gap-4">
      <div class="mt-0.5 shrink-0">
        <UIcon
          :name="icon || 'i-ph-presentation-duotone'"
          class="text-primary size-6"
        />
      </div>
      <div class="min-w-0">
        <p
          class="text-xs text-neutral-500 uppercase tracking-wider font-medium"
        >
          {{ date }}
        </p>
        <div class="flex items-center gap-2 mt-0.5">
          <h3 class="font-semibold text-neutral-900 dark:text-white">
            {{ title }}
          </h3>
          <span
            v-if="lang && flags[lang]"
            class="text-sm shrink-0"
          >{{
            flags[lang]
          }}</span>
          <UButton
            v-if="slides"
            :to="slides"
            target="_blank"
            variant="subtle"
            color="neutral"
            size="xs"
            icon="i-ph-slideshow-duotone"
            class="shrink-0"
            :rel="slides ? 'noopener noreferrer' : undefined"
          >
            See Slides
          </UButton>
        </div>
        <p class="text-sm text-neutral-500 italic">
          {{ venue }}
        </p>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
          {{ description }}
        </p>
        <div
          v-if="$slots.tags"
          class="flex flex-wrap items-center gap-2 mt-3"
        >
          <slot name="tags" />
        </div>
      </div>
    </div>
  </UCard>
</template>
