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
    <div class="flex justify-center my-8">
      <UDivider
        class="md:w-2/3"
        size="2xs"
        type="solid"
      />
    </div>
    <div>
      <h3>Find me on:</h3>
      <div class="flex gap-4 my-4">
        <HomeLink
          v-for="social in socials"
          :key="social.label"
          :icon="social.icon"
          :label="social.label"
          :href="social.link"
        />
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
  </footer>
</template>
