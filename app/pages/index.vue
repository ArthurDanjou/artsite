<script lang="ts" setup>
const { locale } = useI18n()

const { data: page } = await useAsyncData(`/home/${locale.value}`, () => {
  return queryCollection('main').path(`/home/${locale.value}`).first()
}, {
  watch: [locale],
})
</script>

<template>
  <main class="!max-w-none prose dark:prose-invert">
    <ContentRenderer v-if="page" :value="page" class="mt-8 md:mt-16" />
    <HomeStats />
    <HomeActivity />
    <HomeQuote />
    <HomeCatchPhrase />
  </main>
</template>
