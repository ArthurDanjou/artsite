<script lang="ts" setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <UContainer class="z-50 relative">
      <AppHeader />
      <div class="mt-12">
        <slot />
      </div>
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
  </div>
</template>
