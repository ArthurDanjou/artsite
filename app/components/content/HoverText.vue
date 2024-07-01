<script lang="ts" setup>
defineProps({
  text: {
    type: [String, Number],
    required: true
  },
  hover: {
    type: String,
    required: true
  }
})
</script>

<template>
  <UTooltip :text="hover">
    <strong class="leading-3">{{ text }}</strong>
  </UTooltip>
</template>
