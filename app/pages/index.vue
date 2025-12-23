<script lang="ts" setup>
useSeoMeta({
  title: 'AI Safety & Applied Mathematics',
  description: 'Research Engineer & Master 2 Student at Paris-Dauphine (ISF). Focusing on AI Alignment, Robustness, and Safe Deep Learning.',
  ogTitle: 'Arthur Danjou • AI Safety & Applied Mathematics',
  ogDescription: 'Research Engineer & Master 2 Student at Paris-Dauphine (ISF). Focusing on AI Alignment, Robustness, and Safe Deep Learning.',
  twitterCard: 'summary_large_image'
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
