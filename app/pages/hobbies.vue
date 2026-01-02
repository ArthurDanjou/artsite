<script lang="ts" setup>
const { data: page } = await useAsyncData('hobbies', () => {
  return queryCollection('hobbies').first()
})

const head = {
  title: 'Balance & Perspectives',
  description: 'Beyond the code. Exploring how competitive sports, motorsports strategy, and cultural experiences fuel my research resilience and cognitive flexibility.',
  subtitle: ''
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

defineOgImageComponent('NuxtSeo', {
  title: head.title,
  description: head.description,
  subtitle: head.subtitle,
  theme: '#F43F5E'
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
