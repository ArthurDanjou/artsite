<script setup lang="ts">
const description = 'All my thoughts on programming, mathematics, artificial intelligence design, etc., are put together in chronological order. I also write about my projects, my discoveries, and my thoughts.'
useSeoMeta({
  title: 'My Shelf | Arthur Danjou',
  description
})
</script>

<template>
  <main>
    <AppTitle
      :description="description"
      title="Writing on my life, development and my passions."
    />
  </main>
</template>
