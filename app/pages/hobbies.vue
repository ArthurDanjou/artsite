<script lang="ts" setup>
const { data: page } = await useAsyncData('hobbies', () => {
  return queryCollection('hobbies').first()
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
