<template>
  <div class="space-y-8">
    <UDivider
      :label="title"
      size="xs"
    />
    <ul class="space-y-8">
      <slot />
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
