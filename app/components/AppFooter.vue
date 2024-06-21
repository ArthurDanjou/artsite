<script setup lang="ts">
const socials = [
  {
    icon: 'i-ph-x-logo-bold',
    label: 'Twitter',
    link: 'https://twitter.com/ArthurDanj'
  },
  {
    icon: 'i-ph-github-logo-bold',
    label: 'GitHub',
    link: 'https://github.com/ArthurDanjou'
  },
  {
    icon: 'i-ph-linkedin-logo-bold',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/arthurdanjou/'
  }
]
</script>

<template>
  <footer class="mb-16">
    <div class="flex justify-center mb-8">
      <UDivider
        class="md:w-2/3"
        size="2xs"
        type="solid"
      />
    </div>
    <div class="space-y-4">
      <div class="flex gap-2 items-center">
        <h3>Find me on:</h3>
        <div class="flex gap-4">
          <HomeLink
            v-for="social in socials"
            :key="social.label"
            :href="social.link"
            :icon="social.icon"
            :label="social.label"
          />
        </div>
      </div>
      <div class="flex gap-2">
        <h4>Or send me an email:</h4>
        <HomeLink
          label="arthurdanjou@outlook.fr"
          href="mailto:arthurdanjou@outlook.fr"
          blanked
        />
      </div>
    </div>
    <div class="mt-8 w-full flex justify-center text-xs">
      © {{ new Date().getFullYear() }} Arthur Danjou. All rights reserved.
    </div>
  </footer>
</template>
