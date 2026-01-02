<script lang="ts" setup>
const head = {
  title: 'AI Safety & Applied Mathematics',
  description: 'Research Engineer & Master 2 Student at Paris-Dauphine (ISF). Focusing on AI Alignment, Robustness, and Safe Deep Learning.',
  subtitle: ''
}

useSeoMeta({
  title: head.title,
  description: head.description,
  ogTitle: `Arthur Danjou • ${head.title}`,
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
  </main>
</template>
