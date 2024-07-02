<template>
  <h2
    :id="id"
  >
    <a
      v-if="id && generate"
      :href="`#${id}`"
      class="text-xl font-bold border-transparent border-b-2 hover:border-black dark:hover:border-white duration-300"
    >
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<script lang="ts" setup>
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>
