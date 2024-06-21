<script lang="ts" setup>
import type { PropType } from 'vue'
import type { UsesItem } from '#components'

defineProps({
  item: {
    type: Object as PropType<typeof UsesItem>,
    required: true
  }
})
</script>

<template>
  <li>
    <p class="text-base font-semibold text-black dark:text-white">
      {{ item.name }}
    </p>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      {{ item.description }}
    </p>
  </li>
</template>
