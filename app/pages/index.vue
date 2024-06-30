<template>
  <main class="!max-w-none prose dark:prose-invert">
    <ContentDoc path="/" />
  </main>
</template>

<script lang="ts" setup>
const description = 'I\'m Arthur, a Mathematics lover and IA enthusiast. I\'m currently studying at the University of Paris-Saclay. I\'m passionate about Mathematics, Computer Science, and Artificial Intelligence.'
useSeoMeta({
  title: 'Arthur Danjou • Mathematics Lover and IA Enthusiast',
  titleTemplate: '%s',
  description
})
</script>
