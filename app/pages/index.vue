<script lang="ts" setup>
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})

const title = page.value?.title ?? 'AI Safety & Applied Mathematics'
const description = page.value?.description ?? 'AI Research Intern at CMAP, Ecole Polytechnique. Focusing on AI Safety, Robustness, and Statistical Learning.'

const head = {
  title,
  description,
  headline: 'Arthur Danjou’s Research'
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
  headline: head.headline
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
