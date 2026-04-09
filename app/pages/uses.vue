<script lang="ts" setup>
const { data: page } = await useAsyncData('uses', () => {
  return queryCollection('uses').first()
})

const head = {
  title: 'Research Lab & Technical Setup',
  description: 'A curated list of the hardware, software, and self-hosted infrastructure that powers my mathematical modeling and AI research workflows.',
  headline: 'Arthur Danjou’s Research Lab & Technical Setup'
}

useSeoMeta({
  title: head.title,
  description: head.description,
  ogTitle: `${head.title} • Arthur Danjou`,
  ogDescription: head.description,
  twitterCard: 'summary_large_image',
  twitterTitle: head.title,
  twitterDescription: head.description
})

defineOgImage('Pergel.satori', {
  title: head.title,
  description: head.description,
  headline: head.headline
})
</script>

<template>
  <main>
    <ContentRenderer
      v-if="page"
      :value="page"
      class="mt-8 md:mt-16"
    />
  </main>
</template>
