<script setup lang="ts">
const props = withDefaults(defineProps<{
  color?: 'green' | 'orange' | 'red' | 'pink' | 'blue' | 'sky' | 'emerald' | 'neutral'
  size?: 'sm' | 'md'
}>(), { color: 'neutral', size: 'md' })

const palettes = {
  green: { ping: 'bg-green-400', dot: 'bg-green-500' },
  orange: { ping: 'bg-orange-400', dot: 'bg-orange-500' },
  red: { ping: 'bg-red-400', dot: 'bg-red-500' },
  pink: { ping: 'bg-pink-400', dot: 'bg-pink-500' },
  blue: { ping: 'bg-blue-400', dot: 'bg-blue-500' },
  sky: { ping: 'bg-sky-400', dot: 'bg-sky-500' },
  emerald: { ping: 'bg-emerald-400', dot: 'bg-emerald-500' },
  neutral: { ping: 'bg-neutral-400', dot: 'bg-neutral-500' }
}

const palette = computed(() => palettes[props.color])
</script>

<template>
  <span
    class="relative flex"
    :class="size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'"
    aria-hidden="true"
  >
    <span
      class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
      :class="palette.ping"
    />
    <span
      class="relative inline-flex h-full w-full rounded-full transition-colors duration-300"
      :class="palette.dot"
    />
  </span>
</template>
