<script lang="ts" setup>
const { data: page } = await useAsyncData('uses', () => {
  return queryCollection('uses').first()
})

useSeoMeta({
  title: 'Research Lab & Technical Setup',
  description: 'A curated list of the hardware, software, and self-hosted infrastructure that powers my mathematical modeling and AI research workflows.',
  ogTitle: 'Research Lab & Technical Setup • Arthur Danjou',
  ogDescription: 'A curated list of the hardware, software, and self-hosted infrastructure that powers my mathematical modeling and AI research workflows.',
  twitterCard: 'summary_large_image'
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
