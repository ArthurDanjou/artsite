<script setup lang="ts">
const socials = [
  {
    icon: 'i-ph-x-logo-duotone',
    label: 'Twitter',
    link: 'https://twitter.com/ArthurDanj'
  },
  {
    icon: 'i-ph-github-logo-duotone',
    label: 'GitHub',
    link: 'https://github.com/ArthurDanjou'
  },
  {
    icon: 'i-ph-linkedin-logo-duotone',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/arthurdanjou/'
  }, {
    icon: 'i-ph-discord-logo-duotone',
    label: 'Discord',
    link: 'https://discordapp.com/users/179635349100691456'
  }
]
</script>

<template>
  <footer class="my-16">
    <div class="flex justify-center mb-16">
      <UDivider
        class="md:w-2/3"
        size="2xs"
        type="solid"
      />
    </div>
    <div class="space-y-4">
      <div class="flex flex-col md:flex-row gap-2 md:items-center">
        <h1>Find me on:</h1>
        <div class="flex gap-4">
          <HomeLink
            v-for="social in socials.sort((a, b) => a.label.localeCompare(b.label))"
            :key="social.label"
            :href="social.link"
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
