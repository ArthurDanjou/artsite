<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  text: {
    type: [String, Number],
    required: true
  },
  hover: {
    type: String,
    required: true
  },
  position: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>
  }
})
</script>

<template>
  <UTooltip
    :popper="{ placement: position }"
    :text="hover"
  >
    <strong class="leading-3 cursor-help">{{ text }}</strong>
  </UTooltip>
</template>
