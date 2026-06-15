<script lang="ts" setup>
const { data: page } = await useAsyncData('talks', () => {
  return queryCollection('talks').first()
})

const head = {
  title: 'Speaking & Academic Presentations',
  description: 'My first academic talk — a seminar on Byzantine-resilient aggregation rules at CMAP, Ecole Polytechnique. Open to invitations.',
  headline: 'Arthur Danjou\u2019s Talks'
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
