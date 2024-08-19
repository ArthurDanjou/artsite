<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'gray',
  },
})
</script>

<template>
  <span class="inline-flex items-center">
    <UIcon
      class="mb-1 mr-1"
      :name="`i-logos:${icon}`"
    />
    <span
      :class="`text-${color}-500 decoration-${color}-300`"
      class="sofia font-medium underline-offset-2 underline"
    >
      <slot />
    </span>
  </span>
</template>
