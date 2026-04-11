<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks?.h2)))
</script>

<template>
  <h2
    :id="props.id"
    class="w-full md:w-[110%] mt-4 mb-2 font-bold text-4xl md:text-7xl text-transparent opacity-15 text-stroke-neutral-500 text-stroke-2 md:-translate-x-16"
  >
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="no-underline hover:underline"
    >
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>
