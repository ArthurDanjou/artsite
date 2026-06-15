<script lang="ts" setup>
const { data: page } = await useAsyncData('now', () => {
  return queryCollection('now').first()
})

const head = {
  title: 'Current Focus & Momentum',
  description: 'What I am working on right now. Updated regularly to reflect my evolving priorities in AI research, engineering, and life.',
  headline: 'Arthur Danjou\u2019s Now'
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
