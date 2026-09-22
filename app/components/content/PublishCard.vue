<script lang="ts" setup>
interface PublicationLink {
  label: string
  url: string
  icon?: string
}

defineProps<{
  title: string
  description: string
  year?: number
  status?: string
  authors?: string
  tags?: string[]
  links?: PublicationLink[]
  icon?: string
}>()
</script>

<template>
  <div class="flex items-start gap-4">
    <div class="mt-0.5 shrink-0 flex size-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-400/10">
      <UIcon
        :name="icon || 'i-ph-book-duotone'"
        class="text-primary size-5"
      />
    </div>
    <div class="min-w-0 flex-1">
      <p
        v-if="year || status"
        class="text-xs text-neutral-500 uppercase tracking-wider font-medium"
      >
        {{ [year, status].filter(Boolean).join(' · ') }}
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
        v-if="$slots.tags || links?.length || tags?.length"
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
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          :target="link.url.startsWith('http') ? '_blank' : undefined"
          :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined"
          :icon="link.icon || 'i-ph-link-duotone'"
          variant="subtle"
          color="neutral"
          size="xs"
          class="shrink-0"
        >
          {{ link.label }}
        </UButton>
      </div>
    </div>
  </div>
</template>
