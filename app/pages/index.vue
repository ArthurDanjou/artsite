<script lang="ts" setup>
const head = {
  title: 'AI Safety & Applied Mathematics',
  description: 'AI Research Intern at CMAP, Ecole Polytechnique. Focusing on AI Safety, Robustness, and Statistical Learning.',
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

defineOgImage('Pergel.satori', {
  title: head.title,
  description: head.description,
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
