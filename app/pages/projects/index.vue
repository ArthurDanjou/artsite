<script lang="ts" setup>
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').order('publishedAt', 'DESC').all()
})

useSeoMeta({
  title: 'Engineering & Research Labs',
  description: 'Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.',
  ogTitle: 'Engineering & Research Labs • Arthur Danjou',
  ogDescription: 'Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div />
</template>
