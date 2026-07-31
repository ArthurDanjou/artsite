<script lang="ts" setup>
const { data: page } = await useAsyncData('research', () => {
  return queryCollection('research').first()
})

const title = page.value?.title ?? 'Research'
const description = page.value?.description ?? 'My research interests in AI Safety, adversarial robustness, and distributed learning, along with my ongoing work at CMAP, Ecole Polytechnique.'

const head = {
  title,
  description,
  headline: 'Arthur Danjou\u2019s Research'
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
