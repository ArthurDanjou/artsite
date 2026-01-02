<script lang="ts" setup>
const { data: page } = await useAsyncData('uses', () => {
  return queryCollection('uses').first()
})

const head = {
  title: 'Research Lab & Technical Setup',
  description: 'A curated list of the hardware, software, and self-hosted infrastructure that powers my mathematical modeling and AI research workflows.',
  subtitle: 'The gear powering my research & development workflow.'
}

useSeoMeta({
  title: head.title,
  description: head.description,
  ogTitle: `${head.title} • Arthur Danjou`,
  ogDescription: head.description,
  twitterCard: 'summary_large_image'
})

defineOgImageComponent('NuxtSeo', {
  title: head.title,
  subtitle: head.subtitle,
  description: head.description,
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
