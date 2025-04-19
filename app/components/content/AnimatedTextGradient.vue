<script setup lang="ts">
const props = withDefaults(defineProps<{
  text?: string
  gradient?: string
  class?: string
  speed?: number
}>(), {
  text: 'This is a text',
  gradient: 'bg-radial from-orange-400 to-pink-500',
  class: 'font-bold',
  speed: 2,
})

const styleVars = {
  '--animated-speed': `${props.speed}s`,
}
</script>

<template>
  <span
    class="inline-block bg-clip-text text-transparent animate-gradient" :class="[
      gradient,
      props.class,
    ]"
    :style="styleVars"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<style scoped>
.animate-gradient {
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animatedTextGradient-to-right var(--animated-speed) linear infinite;
}
@keyframes animatedTextGradient-to-right {
  to {
    background-position: 200% center;
  }
}
</style>
