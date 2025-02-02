<script lang="ts" setup>
const { locale } = useI18n()

const { data: page } = await useAsyncData(`/home/${locale.value}`, () => {
  return queryCollection('main').path(`/home/${locale.value}`).first()
}, {
  watch: [locale],
})

const { myLocation, locations } = useVisitors()
</script>

<template>
  <main class="!max-w-none prose dark:prose-invert">
    <ContentRenderer v-if="page" :value="page" />
    <HomeStats />
    <HomeActivity />
    <HomeQuote />
    <HomeCatchPhrase />
    {{ locations }}
    {{ myLocation }}
    <HomeGlobe
      :my-location
      :locations
      class="mt-8 mx-auto aspect-[1/1] duration-500 md:w-1/2"
    />
  </main>
</template>
