<script setup lang="ts">
import { TAGS } from '~~/types'

const { t, locale } = useI18n({
  useScope: 'local',
})
useSeoMeta({
  title: 'My Shelf',
  description: t('description'),
})

const { data: writings } = await useAsyncData('all-writings', () => {
  return queryCollection('writings')
    .order('publishedAt', 'DESC')
    .all()
})
</script>

<template>
  <main class="space-y-12">
    <AppTitle
      :description="t('description')"
      :title="t('title')"
    />
    <UAlert
      v-if="locale !== 'en'"
      :description="t('alert.description')"
      :title="t('alert.title')"
      color="red"
      icon="i-ph-warning-duotone"
      variant="outline"
    />
    <ul class="grid grid-cols-1 gap-4">
      <NuxtLink
        v-for="(writing, id) in writings"
        :key="id"
        :to="writing.path"
      >
        <li
          class=" h-full border p-4 border-neutral-200 rounded-md hover:border-neutral-500 dark:border-neutral-800 dark:hover:border-neutral-600  duration-300"
        >
          <article class="space-y-2">
            <h1
              class="font-bold text-lg duration-300 text-black dark:text-white"
            >
              {{ writing.title }}
            </h1>
            <h3>
              {{ writing.description }}
            </h3>
          </article>
          <div class="flex justify-between items-center mt-2">
            <div
              class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
            >
              <UIcon name="ph:calendar-duotone" size="16" />
              <p>{{ useDateFormat(writing.publishedAt, 'DD MMMM YYYY').value }} </p>·
              <UIcon name="ph:timer-duotone" size="16" />
              <p>{{ writing.readingTime }}min long</p>
            </div>
            <div class="flex gap-2 flex-wrap">
              <ClientOnly>
                <UBadge
                  v-for="tag in writing.tags.sort((a: any, b: any) => a.localeCompare(b))"
                  :key="tag"
                  :color="TAGS.find(color => color.label.toLowerCase() === tag)?.color as any"
                  variant="soft"
                  size="sm"
                  class="rounded-full"
                >
                  <div class="flex gap-1 items-center">
                    <UIcon :name="TAGS.find(icon => icon.label.toLowerCase() === tag)?.icon || ''" size="16" />
                    <p>{{ TAGS.find(color => color.label.toLowerCase() === tag)?.label }}</p>
                  </div>
                </UBadge>
              </ClientOnly>
            </div>
          </div>
        </li>
      </NuxtLink>
    </ul>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Writings on math, artificial intelligence, development, and my passions.",
    "description": "All my reflections on programming, mathematics, artificial intelligence design, etc., are organized chronologically.",
    "alert": {
      "title": "Attention to translations!",
      "description": "For time reasons, all article translations will only be available in English. Thank you for your understanding."
    }
  },
  "fr": {
    "title": "Écrits sur les maths, l'intelligence artificielle, le développement et mes passions.",
    "description": "Toutes mes réflexions sur la programmation, les mathématiques, la conception de l'intelligence artificielle, etc., sont mises en ordre chronologique.",
    "alert": {
      "title": "Attentions aux traductions!",
      "description": "Par soucis de temps, toutes les traductions des articles seront disponibles uniquement en anglais. Merci de votre compréhension."
    }
  },
  "es": {
    "title": "Escritos sobre matemáticas, inteligencia artificial, desarrollo y mis pasiones.",
    "description": "Todas mis reflexiones sobre programación, matemáticas, diseño de inteligencia artificial, etc., están organizadas cronológicamente.",
    "alert": {
      "title": "¡Atención a las traducciones!",
      "description": "Por razones de tiempo, todas las traducciones de los artículos estarán disponibles solo en inglés. Gracias por su comprensión."
    }
  }
}
</i18n>

<style scoped>
.tablist > button {
  cursor: pointer !important;
}
</style>
