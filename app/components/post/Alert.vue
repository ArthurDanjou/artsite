<script setup lang="ts">
const { t, locale } = useI18n({
  useScope: 'local',
})

const closed = ref(false)
</script>

<template>
  <UAlert
    v-if="locale !== 'en' && !closed"
    :description="t('alert.description')"
    :title="t('alert.title')"
    color="red"
    icon="i-ph-warning-duotone"
    variant="soft"
    :close="{
      color: 'red',
    }"
    @update:open="closed = true"
  />
</template>

<i18n lang="json">
{
  "en": {
    "alert": {
      "title": "Translations alert!",
      "description": "For time reasons, all article translations will only be available in English. Thank you for your understanding."
    }
  },
  "fr": {
    "alert": {
      "title": "Attention aux traductions !",
      "description": "Pour des raisons de temps, toutes les traductions d'articles ne seront disponibles qu'en anglais. Merci de votre compréhension."
    }
  },
  "es": {
    "alert": {
      "title": "¡Atención a las traducciones!",
      "description": "Por razones de tiempo, todas las traducciones de los artículos estarán disponibles solo en inglés. Gracias por su comprensión."
    }
  }
}
</i18n>
