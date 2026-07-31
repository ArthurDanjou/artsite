<script lang="ts" setup>
const { data: page } = await useAsyncData('now', () => {
  return queryCollection('now').first()
})

const head = {
  title: 'Now',
  description: 'What I am currently working on — research internship at CMAP, incoming PhD, and homelab projects.',
  headline: 'Arthur Danjou\u2019s Now'
}

useSeoMeta({
  title: head.title,
  description: head.description,
  ogTitle: `${head.title} \u2022 Arthur Danjou`,
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
