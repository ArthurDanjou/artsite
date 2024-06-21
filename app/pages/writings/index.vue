<script setup lang="ts">
const description = 'All my thoughts on programming, mathematics, artificial intelligence design, etc., are put together in chronological order. I also write about my projects, my discoveries, and my thoughts.'
useSeoMeta({
  title: 'My Shelf | Arthur Danjou',
  description
})

const { data: writings } = await useAsyncData('all-writings', () =>
  queryContent('/writings').sort({ published: -1 }).without('body').find()
)
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
          <article>
            <div class="border-l-2 pl-2 border-gray-300 dark:border-gray-700 rounded-sm">
              {{ useDateFormat(writing.publishedAt, 'DD MMMM YYYY').value }} - {{ writing.readingTime }}min.
            </div>
            <h1
              class="font-bold my-2 text-lg duration-300 text-gray-600 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white"
            >
              {{ writing.title }}
            </h1>
            <h3>
              {{ writing.description }}
            </h3>
          </article>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
