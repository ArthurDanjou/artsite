<script setup lang="ts">
import { socials } from '~~/types'

const { t } = useI18n({
  useScope: 'local',
})
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
        <h1>{{ t('find') }}</h1>
        <div class="flex gap-2 flex-wrap">
          <HomeLink
            v-for="social in socials.sort((a, b) => a.label.localeCompare(b.label))"
            :key="social.label"
            :to="social.to"
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
  },
  "es": {
    "find": "Encuéntrame en :",
    "email": "O envíame un mail",
    "copyright": "2024 Arthur Danjour. Todos los derechos reservados."
  }
}
</i18n>
