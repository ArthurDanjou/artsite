<template>
  <NuxtLoadingIndicator color="#14b8a6" />
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
</style>
