<script setup lang="ts">
const { y } = useWindowScroll()
const reducedMotion = usePreferredReducedMotion()

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion.value === 'reduce' ? 'instant' : 'smooth'
  })
}
</script>

<template>
  <Transition
    enter-active-class="motion-safe:transition motion-safe:duration-200 motion-safe:ease-out"
    enter-from-class="opacity-0 motion-safe:translate-y-2"
    leave-active-class="motion-safe:transition motion-safe:duration-150 motion-safe:ease-in"
    leave-to-class="opacity-0 motion-safe:translate-y-2"
  >
    <UButton
      v-if="y > 400"
      icon="i-ph-arrow-line-up-duotone"
      color="neutral"
      variant="ghost"
      size="lg"
      class="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-50 size-11 justify-center rounded-md bg-default/90 text-muted hover:bg-default/90 hover:text-highlighted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted motion-safe:transition-colors"
      aria-label="Back to top"
      @click="scrollToTop"
    />
  </Transition>
</template>
