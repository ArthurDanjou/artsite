<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} %separator %siteName` : 'Arthur Danjou %separator AI Safety & Applied Math'
  }
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#808080" />
    <AppBackground />
    <UContainer class="z-50 relative">
      <AppHeader />
      <NuxtPage class="mt-12" />
      <AppFooter />
    </UContainer>
    <UButton
      icon="i-ph-arrow-up-bold"
      size="xl"
      variant="subtle"
      color="neutral"
      class="fixed bottom-4 right-4 z-50 shadow-lg ring-1 ring-neutral-400/30"
      aria-label="Back to top"
      @click="scrollToTop"
    />
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
