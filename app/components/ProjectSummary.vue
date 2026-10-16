<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

defineProps<{
  summary: NonNullable<ProjectsCollectionItem['summary']>
}>()
</script>

<template>
  <UCard
    as="aside"
    variant="subtle"
    aria-labelledby="project-summary-title"
    :ui="{ body: 'space-y-5 p-6 sm:p-8' }"
  >
    <h2
      id="project-summary-title"
      class="flex items-center gap-2 text-sm font-semibold text-highlighted"
    >
      <UIcon
        name="i-ph-list-bullets-duotone"
        class="size-5 text-muted"
      />
      Project at a glance
    </h2>

    <dl class="grid gap-5 sm:grid-cols-3">
      <div class="space-y-1.5">
        <dt class="text-xs font-medium uppercase tracking-wide text-muted">
          My role
        </dt>
        <dd class="text-sm leading-relaxed text-toned">
          {{ summary.role }}
        </dd>
      </div>
      <div class="space-y-1.5">
        <dt class="text-xs font-medium uppercase tracking-wide text-muted">
          Context
        </dt>
        <dd class="text-sm leading-relaxed text-toned">
          {{ summary.context }}
        </dd>
      </div>
      <div class="space-y-1.5">
        <dt class="text-xs font-medium uppercase tracking-wide text-muted">
          Main outcome
        </dt>
        <dd class="text-sm leading-relaxed text-toned">
          {{ summary.outcome }}
        </dd>
      </div>
    </dl>

    <div
      v-if="summary.links?.length"
      class="flex flex-wrap gap-2"
    >
      <UButton
        v-for="link in summary.links"
        :key="link.url"
        :to="link.url"
        :icon="link.icon"
        :label="link.label"
        target="_blank"
        rel="noopener noreferrer"
        color="neutral"
        variant="subtle"
        size="sm"
        class="bg-default ring-neutral-200 hover:bg-muted dark:bg-elevated dark:ring-accented dark:hover:bg-accented/75"
      />
    </div>
  </UCard>
</template>
