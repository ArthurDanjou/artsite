<script lang="ts" setup>
defineProps({
  title: {
    type: Object as PropType<{ en: string; fr: string; es: string }>,
    required: true,
  },
})

const { locale } = useI18n()
</script>

<template>
  <div class="space-y-8">
    <USeparator
      :label="locale === 'en' ? title.en : locale === 'es' ? title.es : title.fr"
      size="xs"
    />
    <ul class="space-y-8">
      <slot />
    </ul>
  </div>
</template>
