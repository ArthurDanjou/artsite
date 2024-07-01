<template>
  <div>
    <NuxtLoadingIndicator color="#808080" />
    <AppBackground />
    <UContainer class="z-50 relative">
      <AppHeader />
      <NuxtPage class="mt-12" />
      <AppFooter />
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
useHead({
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
})
</script>

<style>
body {
  font-family: 'DM Sans', sans-serif;
  @apply h-full w-full text-neutral-700 dark:text-neutral-300;
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
