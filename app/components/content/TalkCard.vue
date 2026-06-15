<script lang="ts" setup>
defineProps<{
  title: string
  date: string
  venue: string
  description: string
  slides?: string
  icon?: string
}>()
</script>

<template>
  <UCard variant="subtle">
    <div class="flex items-start gap-4">
      <div class="mt-0.5 shrink-0">
        <UIcon
          :name="icon || 'i-ph-presentation-duotone'"
          class="text-(--ui-primary) size-6"
        />
      </div>
      <div class="min-w-0">
        <p class="text-xs text-neutral-500 uppercase tracking-wider font-medium">
          {{ date }}
        </p>
        <h3 class="font-semibold text-neutral-900 dark:text-white mt-0.5">
          {{ title }}
        </h3>
        <p class="text-sm text-neutral-500 italic">
          {{ venue }}
        </p>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
          {{ description }}
        </p>
        <UButton
          v-if="slides"
          :to="slides"
          target="_blank"
          variant="ghost"
          color="neutral"
          size="xs"
          icon="i-ph-slideshow-duotone"
          class="mt-2"
        >
          Slides
        </UButton>
      </div>
    </div>
  </UCard>
</template>
