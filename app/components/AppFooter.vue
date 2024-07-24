<script setup lang="ts">
const socials = [
  {
    icon: 'i-ph-x-logo-duotone',
    label: 'Twitter',
    link: 'https://twitter.com/ArthurDanj',
  },
  {
    icon: 'i-ph-github-logo-duotone',
    label: 'GitHub',
    link: 'https://github.com/ArthurDanjou',
  },
  {
    icon: 'i-ph-linkedin-logo-duotone',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/arthurdanjou/',
  },
  {
    icon: 'i-ph-discord-logo-duotone',
    label: 'Discord',
    link: 'https://discordapp.com/users/179635349100691456',
  },
]

const { t } = useI18n({
  useScope: 'local',
})
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
        <h1>{{ t('find') }}</h1>
        <div class="flex gap-2 flex-wrap">
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
        <h1>{{ t('email') }}</h1>
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
      {{
        t('copyright', {
          date: new Date().getFullYear(),
        })
      }}
    </div>
  </footer>
</template>

<i18n lang="json">
{
  "en": {
    "find": "Find me on:",
    "email": "Or send me an email:",
    "copyright": "© {date} Arthur Danjou. All rights reserved."
  },
  "fr": {
    "find": "Retrouvez-moi sur :",
    "email": "Ou envoyez-moi un email :",
    "copyright": "© {date} Arthur Danjou. Tous droits réservés."
  }
}
</i18n>
