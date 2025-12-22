<script lang="ts" setup>
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
})
</script>

<template>
  <div>
    PROJECTS PAGE
    {{ projects }}
  </div>
</template>
