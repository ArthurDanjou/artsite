<script lang="ts" setup>
const { data: page } = await useAsyncData('hobbies', () => {
  return queryCollection('hobbies').first()
})

const title = page.value?.title ?? 'Balance & Perspectives'
const description = page.value?.description ?? 'Beyond the code — rugby, motorsports, music, and travel.'

const head = {
  title,
  description,
  headline: 'Arthur Danjou’s Hobbies'
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
