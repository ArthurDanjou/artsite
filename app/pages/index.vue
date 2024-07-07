<template>
  <main class="!max-w-none prose dark:prose-invert">
    <ContentDoc :path="`/home/${locale}`" />
  </main>
</template>

<script lang="ts" setup>
const { locale } = useI18n()
</script>
