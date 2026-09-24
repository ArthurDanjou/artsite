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
