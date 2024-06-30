<script setup lang="ts">
const description = 'All my thoughts on programming, mathematics, artificial intelligence design, etc., are put together in chronological order. I also write about my projects, my discoveries, and my thoughts.'
definePageMeta({
  title: 'My Shelf',
  description
})

const { data: writings } = await useAsyncData('all-writings', () =>
  queryContent('/writings').sort({ published: -1 }).without('body').find()
)

const { data: writingsDB } = await useAsyncData('all-writings-db', () =>
  $fetch(`/api/posts`)
)

function getDetails(slug: string) {
  const writing = writingsDB.value!.find(writing => writing.slug === slug)
  if (!writing) return ''

  const like = writing.likes! > 1 ? 'likes' : 'like'
  const view = writing.views! > 1 ? 'views' : 'view'

  return `${writing.likes} ${like} · ${writing.views} ${view}`
}
</script>

<template>
  <main>
    <AppTitle
      :description="description"
      title="Writing on my life, development and my passions."
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
            <div class="flex items-center gap-2 flex-wrap">
              <h1
                class="font-bold text-lg duration-300 text-neutral-600 group-hover:text-black dark:text-neutral-400 dark:group-hover:text-white"
              >
                {{ writing.title }}
              </h1>
              <p class="text-sm text-neutral-500 group-hover:text-black dark:group-hover:text-white duration-300">
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
