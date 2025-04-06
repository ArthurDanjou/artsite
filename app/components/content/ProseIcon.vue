<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'gray',
  },
})

const colorVariants = {
  gray: 'text-gray-500/80 decoration-gray-400/80',
  red: 'text-red-500/80 decoration-red-400/80',
  yellow: 'text-yellow-500/80 decoration-yellow-400/80',
  green: 'text-green-500/80 decoration-green-400/80',
  blue: 'text-blue-500/80 decoration-blue-400/80',
  indigo: 'text-indigo-500/80 decoration-indigo-400/80',
  purple: 'text-purple-500/80 decoration-purple-400/80',
  pink: 'text-pink-500/80 decoration-pink-400/80',
  sky: 'text-sky-500/80 decoration-sky-400/80',
  zinc: 'text-zinc-500/80 decoration-zinc-400/80',
  orange: 'text-orange-500/80 decoration-orange-400/80',
  amber: 'text-amber-500/80 decoration-amber-400/80',
  emerald: 'text-emerald-500/80 decoration-emerald-400/80',
}
</script>

<template>
  <span class="inline-flex items-center">
    <UIcon
      class="mr-1"
      :name="`i-logos:${icon}`"
    />
    <span
      :class="colorVariants[color as keyof typeof colorVariants]"
      class="sofia font-medium underline-offset-2 underline"
    >
      <slot />
    </span>
  </span>
</template>
