<script lang="ts" setup>
useSeoMeta({
  title: 'Arthur Danjou - AI enjoyer and Maths student',
  description: 'Developer enjoying Artificial Intelligence and Machine Learning. Mathematics Student at Paris Dauphine-PSL University specialised in Statistics'
})

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
</script>

<template>
  <main class="max-w-none! prose dark:prose-invert">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="mt-8 md:mt-16"
    />
    <HomeStats />
    <HomeActivity />
    <HomeQuote />
    <HomeCatchPhrase />
  </main>
</template>
