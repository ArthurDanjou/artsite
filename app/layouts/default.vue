<template>
  <div>
    <UContainer class="z-50 relative">
      <AppHeader />
      <div class="mt-12">
        <slot />
      </div>
      <AppFooter />
    </UContainer>
    <AppScrollToTop />
  </div>
</template>
