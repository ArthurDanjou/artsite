<script lang="ts" setup>
const { locale } = useI18n()

const { data: page } = await useAsyncData(`/home/${locale.value}`, () => {
  return queryCollection('main').path(`/home/${locale.value}`).first()
})
</script>

<template>
  <main class="!max-w-none prose dark:prose-invert">
    <ContentRenderer v-if="page" :value="page" />
    <HomeMap />
  </main>
</template>
