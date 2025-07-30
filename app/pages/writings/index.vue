<script setup lang="ts">
import { TAGS } from '~~/types'

const { t } = useI18n({
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

const groupedWritings = computed(() => {
  const grouped: Record<string, any[]> = {}
  writings.value!.forEach((writing: any) => {
    const year = new Date(writing.publishedAt).getFullYear().toString()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(writing)
  })
  return Object.entries(grouped).reverse()
})
</script>

<template>
  <main class="space-y-12 mb-12 relative">
    <AppTitle
      :description="t('description')"
      :title="t('title')"
    />
    <PostAlert />
    <div class="space-y-8">
      <div v-for="year in groupedWritings" :key="year[0]" class="lg:space-y-6 relative">
        <h2 class="text-4xl lg:absolute top-2 -left-16 font-bold opacity-10 select-none pointer-events-none lg:[writing-mode:vertical-rl] lg:[text-orientation:upright] pl-1 lg:pl-0">
          {{ year[0] }}
        </h2>
        <ul class="relative grid grid-cols-1 gap-2">
          <NuxtLink
            v-for="(writing, id) in year[1]"
            :key="id"
            :to="writing.path"
          >
            <li
              class="h-full group hover:bg-neutral-200/50 duration-300 p-1 lg:p-2 rounded-lg dark:hover:bg-neutral-800/50 transition-colors"
            >
              <h1
                class="font-bold text-lg duration-300 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
              >
                {{ writing.title }}
              </h1>
              <h3 class="text-neutral-600 dark:text-neutral-400 italic">
                {{ writing.description }}
              </h3>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-1">
                <div
                  class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
                >
                  <ClientOnly>
                    <p>{{ useDateFormat(writing.publishedAt, 'DD MMM').value }} </p>
                  </ClientOnly>
                  <span>·</span>
                  <p>{{ writing.readingTime }}min</p>
                  <span class="w-2" />
                  <div class="flex gap-2 flex-wrap">
                    <ClientOnly>
                      <UBadge
                        v-for="tag in writing.tags.sort((a: any, b: any) => a.localeCompare(b))"
                        :key="tag"
                        variant="soft"
                        size="sm"
                      >
                        {{ TAGS.find(color => color.label.toLowerCase() === tag)?.label }}
                      </UBadge>
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </li>
          </NuxtLink>
        </ul>
      </div>
    </div>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Writings on math, artificial intelligence, development, and my passions.",
    "description": "All my reflections on programming, mathematics, artificial intelligence design, etc., are organized chronologically."
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
    "description": "Todas mis reflexiones sobre programación, matemáticas, diseño de inteligencia artificial, etc., están organizadas cronológicamente."
  }
}
</i18n>
