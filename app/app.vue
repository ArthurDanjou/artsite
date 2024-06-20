<script setup lang="ts">
useSeoMeta({
  title: 'Arthur Danjou - Maths lover',
  description: 'A Nuxt template to build your full-stack application on the edge.'
})
</script>

<template>
  <NuxtLoadingIndicator color="#14b8a6" />
  <UContainer>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </UContainer>
</template>

<style>
body {
  font-family: 'DM Sans', sans-serif;
  @apply h-full w-full p-0 m-0 text-[#374151] dark:text-[#d1d5db];
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
