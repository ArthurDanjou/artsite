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
  <ClientOnly>
    <UTooltip
      :popper="{ placement: position }"
      :text="hover"
    >
      <strong class="leading-3 cursor-help text-wrap">{{ text }}</strong>
    </UTooltip>
  </ClientOnly>
</template>
