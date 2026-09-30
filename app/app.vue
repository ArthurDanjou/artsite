<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} %separator %siteName` : 'Arthur Danjou %separator AI Safety & Applied Math'
  }
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#808080" />
    <AppBackground />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <SkewNotification v-slot="{ isCurrentChunksOutdated, dismiss, reload }">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="isCurrentChunksOutdated"
          class="fixed bottom-4 right-4 z-50"
        >
          <div class="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-full shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 px-4 py-3">
            <span class="text-lg">✨</span>
            <div class="text-sm font-medium">
              Update available
            </div>
            <UButton
              color="primary"
              size="xs"
              label="Refresh"
              @click="reload"
            />
            <UButton
              color="gray"
              variant="ghost"
              size="xs"
              icon="i-heroicons-x-mark-20-solid"
              aria-label="Dismiss update"
              @click="dismiss"
            />
          </div>
        </div>
      </Transition>
    </SkewNotification>
  </UApp>
</template>

<style scoped>
.sofia {
  font-family: 'Sofia Sans', sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.99);
  filter: blur(3px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.99);
  filter: blur(3px);
}
</style>
