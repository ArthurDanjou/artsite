<script lang="ts" setup>
import type { UsesItem } from '#components'
import type { PropType } from 'vue'

defineProps({
  item: {
    type: Object as PropType<typeof UsesItem>,
    required: true,
  },
})

const { locale } = useI18n()
</script>

<template>
  <li>
    <p class="text-base font-semibold text-black dark:text-white">
      {{ item.name }}
    </p>
    <p class="text-sm">
      {{ locale === 'en' ? item.description.en : item.description.fr }}
    </p>
  </li>
</template>
