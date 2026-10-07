<script lang="ts" setup>
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})

const title = page.value?.title ?? 'AI Safety & Applied Mathematics'
const description = page.value?.description ?? 'AI Research Intern at CMAP, Ecole Polytechnique. Focusing on AI Safety, Robustness, and Statistical Learning.'

const head = {
  title,
  description,
  metaDescription: truncateMetaText(description, 155),
  headline: 'Arthur Danjou’s Research'
}

useSeoMeta({
  title: head.title,
  description: head.metaDescription,
  ogTitle: `Arthur Danjou • ${head.title}`,
  ogDescription: head.metaDescription
})

defineOgImage('Pergel.satori', {
  title: head.title,
  description: head.metaDescription,
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
