<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span class="inline-flex items-center">
    <UIcon
      class="mb-1 mr-1"
      :name="icon"
    />
    <span class="sofia font-medium underline-offset-2 underline decoration-neutral-300 dark:decoration-neutral-700">
      <slot />
    </span>
  </span>
</template>
