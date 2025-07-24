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
  gray: 'text-gray-500/80 decoration-gray-400/40',
  red: 'text-red-500/80 decoration-red-400/40',
  yellow: 'text-yellow-500/80 decoration-yellow-400/40',
  green: 'text-green-500/80 decoration-green-400/40',
  blue: 'text-blue-500/80 decoration-blue-400/40',
  indigo: 'text-indigo-500/80 decoration-indigo-400/40',
  purple: 'text-purple-500/80 decoration-purple-400/40',
  pink: 'text-pink-500/80 decoration-pink-400/40',
  sky: 'text-sky-500/80 decoration-sky-400/40',
  zinc: 'text-zinc-500/80 decoration-zinc-400/40',
  orange: 'text-orange-500/80 decoration-orange-400/40',
  amber: 'text-amber-500/80 decoration-amber-400/40',
  emerald: 'text-emerald-500/80 decoration-emerald-400/40',
}
</script>

<template>
  <span class="inline-flex items-center transform translate-y-1 gap-1">
    <UIcon :name="icon" />
    <span
      :class="colorVariants[color as keyof typeof colorVariants]"
      class="sofia underline-offset-2 underline"
    >
      <slot />
    </span>
  </span>
</template>
