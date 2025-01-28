<script setup lang="ts">
const { isLoading, visitors } = useVisitors()
</script>

<template>
  <div class="fixed bottom-4 right-4">
    <UTooltip text="Visitors currently on my portfolio" placement="left">
      <nav v-if="!isLoading" class="text-xs flex space-x-1 items-center border border-green-400 dark:border-green-600 px-2 rounded-xl  bg-white dark:bg-black">
        <p class="text-neutral-700 dark:text-neutral-300">
          {{ visitors }}
        </p>
        <div class="h-3 w-3 bg-green-200 dark:bg-green-600 rounded-full border-2 border-green-400 dark:border-green-800" />
      </nav>
    </UTooltip>
  </div>
</template>
