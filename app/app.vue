<script lang="ts" setup>
useHead({
  link: [{ rel: 'icon', type: 'image/webp', href: '/favicon.webp' }],
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#808080" />
    <AppBackground />
    <AppVisitors />
    <UContainer class="z-50 relative">
      <AppHeader />
      <NuxtPage class="mt-12" />
      <AppFooter />
    </UContainer>
  </UApp>
</template>

<style scoped>
@reference "@/assets/css/main.css";

body {
  font-family: 'DM Sans', sans-serif;
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
