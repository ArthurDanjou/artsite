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
  gray: 'text-gray-500/60 decoration-gray-400/60',
  red: 'text-red-500/60 decoration-red-400/60',
  yellow: 'text-yellow-500/60 decoration-yellow-400/60',
  green: 'text-green-500/60 decoration-green-400/60',
  blue: 'text-blue-500/60 decoration-blue-400/60',
  indigo: 'text-indigo-500/60 decoration-indigo-400/60',
  purple: 'text-purple-500/60 decoration-purple-400/60',
  pink: 'text-pink-500/60 decoration-pink-400/60',
  sky: 'text-sky-500/60 decoration-sky-400/60',
  zinc: 'text-zinc-500/60 decoration-zinc-400/60',
  orange: 'text-orange-500/60 decoration-orange-400/60',
  amber: 'text-amber-500/60 decoration-amber-400/60',
  emerald: 'text-emerald-500/60 decoration-emerald-400/60',
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
