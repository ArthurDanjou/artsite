<script lang="ts" setup>
const { data: page } = await useAsyncData('hobbies', () => {
  return queryCollection('hobbies').first()
})

useSeoMeta({
  title: 'Balance & Perspectives',
  description: 'Beyond the code. Exploring how competitive sports, motorsports strategy, and cultural experiences fuel my research resilience and cognitive flexibility.',
  ogTitle: 'Balance & Perspectives • Arthur Danjou',
  ogDescription: 'Beyond the code. Exploring how competitive sports, motorsports strategy, and cultural experiences fuel my research resilience and cognitive flexibility.',
  twitterCard: 'summary_large_image'
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
