<script lang="ts" setup>
defineProps<{ src: string, caption?: string, rounded?: boolean }>()
</script>

<template>
  <div class="flex flex-col justify-center items-center prose-none my-8">
    <img :src="src" :alt="caption" class="w-full h-auto m-0 prose-none" :class="{ 'rounded-lg': rounded }">
    <p class="mt-2 text-sm text-gray-500 dark:text-gray-300 prose-none">
      {{ caption }}
    </p>
  </div>
</template>
