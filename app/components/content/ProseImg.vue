<script lang="ts" setup>
defineProps<{ src: string, label: string, caption?: string }>()
</script>

<template>
  <div class="flex flex-col justify-center items-center prose-none my-8">
    <img :src="src" :alt="label" class="w-full h-auto m-0 prose-none">
    <p class="mt-2 text-sm text-gray-500 dark:text-gray-300 prose-none">
      {{ caption }}
    </p>
  </div>
</template>
