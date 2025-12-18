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
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'top'
  }
})
</script>

<template>
  <ClientOnly>
    <UTooltip
      :popper="{ placement: position }"
      :delay-duration="4"
      :content="{
        align: 'center',
        side: position,
        sideOffset: 8
      }"
      :text="hover"
    >
      <strong class="leading-3 cursor-help">{{ text }}</strong>
    </UTooltip>
  </ClientOnly>
</template>
