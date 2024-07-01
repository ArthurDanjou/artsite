<script lang="ts" setup>
import type { Placement } from '@popperjs/core'
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
    type: String as PropType<Placement>
  }
})
</script>

<template>
  <UTooltip
    :popper="{ placement: position }"
    :text="hover"
  >
    <strong class="leading-3">{{ text }}</strong>
  </UTooltip>
</template>
