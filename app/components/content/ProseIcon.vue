<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span class="inline">
    <UIcon
      class="mb-1 mr-1"
      :name="icon"
    />
    <span class="sofia font-medium underline decoration-neutral-300 dark:decoration-neutral-700">
      <slot />
    </span>
  </span>
</template>
