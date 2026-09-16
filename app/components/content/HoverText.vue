<script lang="ts" setup>
interface HoverTextProps {
  text: string | number
  hover: string
  position?: 'top' | 'right' | 'bottom' | 'left'
}

withDefaults(defineProps<HoverTextProps>(), {
  position: 'top'
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
