<script setup lang="ts">
const { t, locale } = useI18n({
  useScope: 'local',
})
useSeoMeta({
  title: 'My Shelf',
  description: t('description'),
})

const { data: writings } = await useAsyncData('all-writings', () =>
  queryContent('/writings').sort({ published: -1 }).without('body').find())

const { data: writingsDB } = await useAsyncData('all-writings-db', () =>
  $fetch(`/api/posts`))

function getDetails(slug: string) {
  const writing = writingsDB.value!.find(writing => writing.slug === slug)
  if (!writing)
    return ''

  const like = writing.likes! > 1 ? t('likes.many') : t('likes.one')
  const view = writing.views! > 1 ? t('views.many') : t('views.one')

  return `${writing.likes} ${like} · ${writing.views} ${view}`
}
</script>

<template>
  <main>
    <AppTitle
      :description="t('description')"
      :title="t('title')"
    />
    <UAlert
      v-if="locale !== 'en'"
      :description="t('alert.description')"
      :title="t('alert.title')"
      class="mt-12"
      color="red"
      icon="i-ph-warning-duotone"
      variant="outline"
    />
    <ul class="mt-12 space-y-24">
      <li
        v-for="(writing, id) in writings"
        :key="id"
      >
        <NuxtLink
          :to="writing._path"
          class="group"
        >
          <article class="space-y-1">
            <div class="border-l-2 pl-2 border-gray-300 dark:border-gray-700 rounded-sm">
              <p>{{ getDetails(writing.slug) }}</p>
            </div>
            <div class="flex items-end gap-2 flex-wrap">
              <h1
                class="font-bold text-lg duration-300 text-neutral-600 group-hover:text-black dark:text-neutral-400 dark:group-hover:text-white"
              >
                {{ writing.title }}
              </h1>
              <p
                class="mb-0.5 text-sm text-neutral-500 group-hover:text-black dark:group-hover:text-white duration-300"
              >
                {{ useDateFormat(writing.publishedAt, 'DD MMMM YYYY').value }} · {{ writing.readingTime }}min long
              </p>
            </div>
            <h3>
              {{ writing.description }}
            </h3>
          </article>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Writing on my life, development and my passions.",
    "description": "All my thoughts on programming, mathematics, artificial intelligence design, etc., are put together in chronological order. I also write about my projects, my discoveries, and my thoughts.",
    "likes": {
      "one": "like",
      "many": "likes"
    },
    "views": {
      "one": "view",
      "many": "views"
    },
    "alert": {
      "title": "Translations alert!",
      "description": "Due to time constraints, all article translations will be available only in English. Thank you for your understanding."
    }
  },
  "fr": {
    "title": "Écrits sur ma vie, le développement et mes passions.",
    "description": "Toutes mes réflexions sur la programmation, les mathématiques, la conception de l'intelligence artificielle, etc., sont mises en ordre chronologique. J'écris aussi sur mes projets, mes découvertes et mes pensées.",
    "likes": {
      "one": "like",
      "many": "likes"
    },
    "views": {
      "one": "vue",
      "many": "vues"
    },
    "alert": {
      "title": "Attentions aux traductions!",
      "description": "Par soucis de temps, toutes les traductions des articles seront disponibles uniquement en anglais. Merci de votre compréhension."
    }
  }
}
</i18n>
