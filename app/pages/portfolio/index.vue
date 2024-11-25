<script setup lang="ts">
const { t, locale } = useI18n({
  useScope: 'local',
})
useSeoMeta({
  title: 'My Shelf',
  description: t('description'),
})

const { data: writings } = await useAsyncData('all-portfolio', () =>
  queryContent('/portfolio').sort({ published: -1 }).without('body').find())
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
    <ul class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <li
        v-for="(writing, id) in writings"
        :key="id"
        class="border p-4 shadow-sm border-neutral-200 rounded-md hover:border-neutral-500 dark:border-neutral-800 dark:hover:border-neutral-500  duration-300"
      >
        <NuxtLink
          :to="writing._path"
        >
          <article class="space-y-2">
            <div class="flex gap-2 flex-col">
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
            </div>
            <h3>
              {{ writing.description }}
            </h3>
          </article>
          <div class="flex gap-2 mt-2 flex-wrap">
            <UBadge
              v-for="tag in writing.tags"
              :key="tag"
              color="gray"
              variant="soft"
              size="md"
            >
              {{ tag }}
            </UBadge>
          </div>
        </NuxtLink>
      </li>
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
