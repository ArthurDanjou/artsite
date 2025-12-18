<script lang="ts" setup>
const { width } = useWindowSize()
const { t } = useI18n({
  useScope: 'local'
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="width > 1024"
      class="text-[12px] italic flex items-center gap-1 mt-4"
    >
      <UIcon
        class="transform -rotate-12 duration-300 animate-wave"
        name="i-ph-hand-pointing-duotone"
      />
      <p>{{ t('quote') }}</p>
    </div>
  </ClientOnly>
</template>

<i18n lang="json">
{
  "en": {
    "quote": "Hover the bold texts to find out more about me."
  },
  "fr": {
    "quote": "Survolez les textes en gras pour en savoir plus sur moi."
  },
  "es": {
    "quote": "Pase el cursor sobre los textos en negrita para obtener más información sobre mí."
  }
}
</i18n>
