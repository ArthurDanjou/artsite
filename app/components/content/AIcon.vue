<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="inline">
    <UIcon
      class="mb-1 mr-1"
      :name="icon"
      :dynamic="true"
    />
    <span class="sofia font-medium underline decoration-gray-100 dark:decoration-neutral-700">
      <slot />
    </span>
  </div>
</template>
