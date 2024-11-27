<script setup lang="ts">
import { type Tag, TAGS } from '~~/types'

const { t, locale } = useI18n({
  useScope: 'local',
})
useSeoMeta({
  title: 'My Shelf',
  description: t('description'),
})

const tagFilter = ref<string | undefined>(undefined)

const { data: writings, refresh } = await useAsyncData('all-portfolio', () => queryContent('/portfolio')
  .sort({ publishedAt: -1 })
  .where({
    tags: { $contains: tagFilter.value },
  })
  .without('body')
  .find())

watch(tagFilter, async () => await refresh())

const tags: Array<{ label: string, icon: string } & Tag> = [
  {
    label: 'All',
    icon: 'i-ph-books-duotone',
    color: 'black',
  },
  ...TAGS.filter(tag => tag.sort).sort((a, b) => a.label.localeCompare(b.label)),
]

function updateTag(index: number) {
  const tag = tags[index]
  tagFilter.value = tag?.label.toLowerCase() === 'all' ? undefined : tag?.label.toLowerCase()
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
    <UTabs :items="tags" @change="updateTag" />
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink
        v-for="(writing, id) in writings"
        :key="id"
        :to="writing._path"
      >
        <li
          class=" h-full border p-4 shadow-sm border-neutral-200 rounded-md hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500  duration-300"
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
                :ui="{ rounded: 'rounded-full' }"
              >
                {{ TAGS.find(color => color.label.toLowerCase() === tag)?.label }}
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
    }
  },
  "fr": {
    "title": "Écrits sur ma vie, le développement, mes projets et mes passions.",
    "description": "Toutes mes réflexions sur la programmation, les mathématiques, la conception de l'intelligence artificielle, etc., sont mises en ordre chronologique. J'écris aussi sur mes projets, mes découvertes et mes pensées.",
    "alert": {
      "title": "Attentions aux traductions!",
      "description": "Par soucis de temps, toutes les traductions des articles seront disponibles uniquement en anglais. Merci de votre compréhension."
    }
  }
}
</i18n>
