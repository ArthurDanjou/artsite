<script setup lang="ts">
import { socials } from '~~/types'
</script>

<template>
  <footer class="my-16">
    <div class="flex justify-center mb-16">
      <USeparator
        class="md:w-2/3"
        size="xs"
        type="solid"
      />
    </div>
    <div class="space-y-4">
      <div class="flex flex-col md:flex-row gap-2 md:items-center">
        <h1>Find me on:</h1>
        <div class="flex gap-2 flex-wrap">
          <HomeLink
            v-for="social in [...socials].sort((a, b) => a.label.localeCompare(b.label))"
            :key="social.label"
            :href="social.to"
            :icon="social.icon"
            :label="social.label"
            target="_blank"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-2 md:items-center">
        <h1>Or send me an email:</h1>
        <div class="flex">
          <HomeLink
            blanked
            href="mailto:arthurdanjou@outlook.fr"
            label="arthurdanjou@outlook.fr"
          />
        </div>
      </div>
    </div>
    <div class="mt-8 w-full flex justify-center text-xs">
      © {{ new Date().getFullYear() }} Arthur Danjou. All rights reserved.
    </div>
  </footer>
</template>
