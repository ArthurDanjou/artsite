<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <h1 class="w-full md:w-[110%] mt-4 mb-2 font-bold text-4xl md:text-7xl text-transparent opacity-15 text-stroke-neutral-500 text-stroke-2 md:-translate-x-16">
    {{ title }}
  </h1>
</template>
