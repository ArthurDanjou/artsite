<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
})
</script>

<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="sofia font-medium duration-300 underline-offset-2 text-md text-black dark:text-white underline decoration-gray-300 dark:decoration-neutral-700 hover:decoration-black dark:hover:decoration-white"
  >
    <slot />
  </NuxtLink>
</template>
