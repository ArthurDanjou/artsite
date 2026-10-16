<script setup lang="ts">
import { TegakiRenderer } from 'tegaki/vue'
import parisienne from 'tegaki/fonts/parisienne'

const props = withDefaults(defineProps<{
  animated?: boolean
  playing?: boolean
}>(), {
  playing: true
})

const time = computed(() => props.animated
  ? { mode: 'uncontrolled' as const, duration: 5, playing: props.playing }
  : '100%' as const)
</script>

<template>
  <ClientOnly>
    <TegakiRenderer
      :font="parisienne"
      text="Arthur Danjou"
      :time="time"
      :pressure="0.7"
      :style="{ fontSize: '1em', letterSpacing: '0.03em' }"
      class="handwriting block leading-none"
    />
  </ClientOnly>
</template>
