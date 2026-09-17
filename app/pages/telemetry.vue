<script lang="ts" setup>
const { data: page } = await useAsyncData('telemetry', () => {
  return queryCollection('telemetry').first()
})

const title = page.value?.title ?? 'Live Homelab Telemetry'
const description = page.value?.description ?? 'Live telemetry from my homelab: current environment, coding stats, system status, and activity history at a glance.'

const head = {
  title,
  description,
  headline: 'Arthur Danjou’s Live Homelab Telemetry'
}

useSeoMeta({
  title: head.title,
  description: head.description,
  ogTitle: `${head.title} • Arthur Danjou`,
  ogDescription: head.description
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
