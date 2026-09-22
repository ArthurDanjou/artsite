<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  status?: string
  authors?: string
  tags?: string[]
  url?: string
  linkLabel?: string
  icon?: string
}>()
</script>

<template>
  <UCard class="transition-all duration-300 hover:ring-neutral-300/50 dark:hover:ring-neutral-700/50">
    <div class="flex items-start gap-4">
      <div class="mt-0.5 shrink-0 flex size-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-400/10">
        <UIcon
          :name="icon || 'i-ph-book-duotone'"
          class="text-primary size-5"
        />
      </div>
      <div class="min-w-0 flex-1">
        <p
          v-if="status"
          class="text-xs text-neutral-500 uppercase tracking-wider font-medium"
        >
          {{ status }}
        </p>
        <h3 class="font-semibold text-neutral-900 dark:text-white mt-0.5">
          {{ title }}
        </h3>
        <p
          v-if="authors"
          class="text-sm text-neutral-500 italic mt-0.5"
        >
          {{ authors }}
        </p>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
          {{ description }}
        </p>
        <div
          v-if="$slots.tags || url || tags?.length"
          class="flex flex-wrap items-center gap-2 mt-3"
        >
          <slot name="tags" />
          <UBadge
            v-for="tag in tags"
            :key="tag"
            color="neutral"
            variant="outline"
            size="xs"
          >
            {{ tag }}
          </UBadge>
          <UButton
            v-if="url"
            :to="url"
            target="_blank"
            variant="subtle"
            color="neutral"
            size="xs"
            icon="i-ph-github-logo-duotone"
            class="shrink-0"
            rel="noopener noreferrer"
          >
            {{ linkLabel || 'View on GitHub' }}
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>
