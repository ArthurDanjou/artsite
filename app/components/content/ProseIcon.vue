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
  gray: 'text-gray-500 decoration-gray-400',
  red: 'text-red-500 decoration-red-400',
  yellow: 'text-yellow-500 decoration-yellow-400',
  green: 'text-green-500 decoration-green-400',
  blue: 'text-blue-500 decoration-blue-400',
  indigo: 'text-indigo-500 decoration-indigo-400',
  purple: 'text-purple-500 decoration-purple-400',
  pink: 'text-pink-500 decoration-pink-400',
  sky: 'text-sky-500 decoration-sky-400',
  zinc: 'text-zinc-500 decoration-zinc-400',
  orange: 'text-orange-500 decoration-orange-400',
  amber: 'text-amber-500 decoration-amber-400',
  emerald: 'text-emerald-500 decoration-emerald-400',
}
</script>

<template>
  <span class="inline-flex items-center">
    <UIcon
      class="mr-1"
      :name="`i-logos:${icon}`"
    />
    <span
      :class="colorVariants[color]"
      class="sofia font-medium underline-offset-2 underline"
    >
      <slot />
    </span>
  </span>
</template>
