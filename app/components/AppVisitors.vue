<script lang="ts" setup>
const { visitors } = useVisitors()
</script>

<template>
  <ClientOnly>
    <UBadge
      color="green"
      variant="outline"
      class="shadow-xl fixed bottom-4 right-4 rounded-full px-1.5 py-0.5 bg-white ring ring-green-400 dark:bg-neutral-950 dark:ring-green-600"
    >
      <div class="flex items-center gap-1">
        <p class="text-neutral-500">
          {{ visitors }}
        </p>
        <div class="w-3 h-3 bg-green-200/70 dark:bg-green-800/70 rounded-full border-2 border-green-400 dark:border-green-600" />
      </div>
    </UBadge>
  </ClientOnly>
</template>
