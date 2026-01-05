<script lang="ts" setup>
useSeoMeta({
  title: 'Coming Soon',
  description: 'This page is currently under development.',
  robots: 'noindex, nofollow'
})
</script>

<template>
  <main class="min-h-[60vh] flex flex-col items-center justify-center p-4">
    <div class="max-w-2xl text-center space-y-8">
      <h1 class="p-2 text-4xl md:text-6xl font-bold bg-linear-to-r from-inverted/40 to-inverted/75 to-70% bg-clip-text text-transparent duration-200 my-12 md:my-24">
        Coming Soon... Very soon...
      </h1>

      <p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
        This page is currently under development. Please check back later for exciting updates about my ecosystem, projects, and contributions.
      </p>

      <div class="pt-8">
        <UButton
          to="/"
          icon="i-ph-arrow-left"
          size="lg"
          color="neutral"
          variant="ghost"
        >
          Return Home
        </UButton>
      </div>
    </div>
  </main>
</template>
