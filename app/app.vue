<template>
  <NuxtLoadingIndicator color="#808080" />
  <AppBackground />
  <UContainer class="z-50 relative">
    <AppHeader />
    <NuxtPage class="mt-12" />
    <AppFooter />
  </UContainer>
</template>

<style>
body {
  font-family: 'DM Sans', sans-serif;
  @apply h-full w-full !text-gray-600 dark:!text-gray-400;
}

.sofia {
  font-family: 'Sofia Sans', sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

/* view transition api */
::view-transition-group(root) {
  animation-duration: 0.7s;
  animation-timing-function: linear(
    0 0%, 0.2342 12.49%, 0.4374 24.99%,
    0.6093 37.49%, 0.6835 43.74%,
    0.7499 49.99%, 0.8086 56.25%,
    0.8593 62.5%, 0.9023 68.75%, 0.9375 75%,
    0.9648 81.25%, 0.9844 87.5%,
    0.9961 93.75%, 1 100%
  );
}

::view-transition-new(root) {
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="0" cy="0" r="18" fill="white" filter="url(%23blur)"/></svg>') top left / 0 no-repeat;
  mask-origin: content-box;
  animation: scale 1s;
  transform-origin: top left;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: scale 1s;
  transform-origin: top left;
  z-index: -1;
}

@keyframes scale {
  to {
    mask-size: 350vmax;
  }
}
</style>
