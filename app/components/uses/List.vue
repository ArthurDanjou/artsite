<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="space-y-8">
    <USeparator
      :label="title"
      size="xs"
    />
    <ul class="space-y-8">
      <slot />
    </ul>
  </div>
</template>
