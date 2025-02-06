<script setup lang="ts">
import type { Tag } from '~~/types'
import { TAGS } from '~~/types'

const { t, locale } = useI18n({
  useScope: 'local',
})
useSeoMeta({
  title: 'My Shelf',
  description: t('description'),
})

const tagFilter = ref<string[]>([])

const { data: writings, refresh } = await useAsyncData('all-portfolio', async () => {
  const writings = await queryCollection('portfolio')
    .order('publishedAt', 'DESC')
    .all()
  return writings.filter((writing) => {
    if (tagFilter.value.length === 0)
      return true
    return writing.tags.some(tag => tagFilter.value.includes(tag.toLowerCase()))
  })
})

watch(tagFilter, async () => await refresh())

const tags: Array<Tag> = [
  ...TAGS.sort((a, b) => a.label.localeCompare(b.label)),
]

function updateTag(payload: Tag[]) {
  tagFilter.value = payload.map(tag => tag.label.toLowerCase())
}
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
    <div class="flex justify-end sticky top-4 z-50">
      <USelectMenu
        :placeholder="t('tags')"
        :items="tags"
        multiple
        color="neutral"
        :highlight-on-hover="true"
        class="w-full md:w-1/3"
        @update:model-value="updateTag"
      />
    </div>
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
            <div
              class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
            >
              <UIcon name="ph:calendar-duotone" size="16" />
              <p>{{ useDateFormat(writing.publishedAt, 'DD MMMM YYYY').value }} </p>·
              <UIcon name="ph:timer-duotone" size="16" />
              <p>{{ writing.readingTime }}min long</p>
            </div>
            <h3>
              {{ writing.description }}
            </h3>
          </article>
          <div class="flex gap-2 mt-4 flex-wrap">
            <ClientOnly>
              <UBadge
                v-for="tag in writing.tags.sort((a: any, b: any) => a.localeCompare(b))"
                :key="tag"
                :color="TAGS.find(color => color.label.toLowerCase() === tag)?.color"
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
        </li>
      </NuxtLink>
    </ul>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Writing on my life, development, academic and personal projects and passions",
    "description": "All my thoughts on programming, mathematics, artificial intelligence design, etc., are put together in chronological order. I also write about my projects, my discoveries, and my thoughts.",
    "alert": {
      "title": "Translations alert!",
      "description": "Due to time constraints, all article translations will be available only in English. Thank you for your understanding."
    },
    "tags": "Select tags to filter"
  },
  "fr": {
    "title": "Écrits sur ma vie, le développement, mes projets et mes passions.",
    "description": "Toutes mes réflexions sur la programmation, les mathématiques, la conception de l'intelligence artificielle, etc., sont mises en ordre chronologique. J'écris aussi sur mes projets, mes découvertes et mes pensées.",
    "alert": {
      "title": "Attentions aux traductions!",
      "description": "Par soucis de temps, toutes les traductions des articles seront disponibles uniquement en anglais. Merci de votre compréhension."
    },
    "tags": "Sélectionner des tags pour filtrer"
  },
  "es": {
    "title": "Escritos sobre mi vida, el desarrollo, mis proyectos y mis pasiones.",
    "description": " Todas mis reflexiones sobre la programación, las matemáticas, la conception de la inteligencia artificial, etc. están puestas en orden cronológico. También escribo sobre mis proyectos, mis descubrimientos y mis pensamientos.",
    "alert": {
      "title": "Cuidado con las traducciones !",
      "description": "Por problema de tiempo, los artículos están solo disponibles en ingles. Gracias por vuestra comprensión."
    },
    "tags": "Seleccionar etiquetas para filtrar"
  }
}
</i18n>

<style scoped>
.tablist > button {
  cursor: pointer !important;
}
</style>
