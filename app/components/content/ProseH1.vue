<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc

const generate = computed(() => {
  if (!props.id) return false

  const anchorLinks = headings?.anchorLinks
  if (anchorLinks === true) return true
  if (typeof anchorLinks === 'boolean') return false

  return !!anchorLinks?.h1
})

<template>
  <h1
    :id="props.id"
    class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight"
  >
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="no-underline hover:underline"
    >
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>
