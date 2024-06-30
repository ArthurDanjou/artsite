<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(`writing:${route.params.slug}`, () => queryContent(`/writings/${route.params.slug}`).findOne())
const {
  data: postDB,
  refresh
} = await useAsyncData(`writing:${route.params.slug}:db`, () => $fetch(`/api/posts/${route.params.slug}`, { method: 'POST' }))

function top() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

const { copy, copied } = useClipboard({
  source: `https://arthurdanjou.fr/writing/${route.params.slug}`,
  copiedDuring: 4000
})

useHead({
  title: `${post.value!.title ?? 'Untitled'} | Arthur Danjou`
})

function getDetails() {
  const likes = postDB.value?.likes ?? 0
  const views = postDB.value?.views ?? 0

  const like = likes > 1 ? 'likes' : 'like'
  const view = views > 1 ? 'views' : 'view'

  return `${likes} ${like} · ${views} ${view}`
}

async function handleLike() {
  await $fetch(`/api/posts/like/${route.params.slug}`, { method: 'PUT' })
  await refresh()
}
</script>

<template>
  <main v-if="post && postDB">
    <div class="flex">
      <NuxtLink
        class="flex items-center gap-2 mb-8 group text-sm hover:text-black dark:hover:text-white duration-300"
        to="/writings"
      >
        <UIcon
          class="group-hover:-translate-x-1 transform duration-300"
          name="i-ph-arrow-left-duotone"
          size="20"
        />
        Go back
      </NuxtLink>
    </div>
    <p class="border-l-2 pl-2 border-gray-300 dark:border-gray-700 rounded-sm">
      {{ getDetails() }}
    </p>
    <div>
      <div class="flex items-end gap-2 flex-wrap">
        <h1
          class="font-bold text-3xl text-black dark:text-white"
        >
          {{ post.title }}
        </h1>
        <p class="text-sm text-neutral-500">
          {{ useDateFormat(post.publishedAt, 'DD MMMM YYYY').value }} · {{ post.readingTime }}min long
        </p>
      </div>
      <p class="mt-4 text-base">
        {{ post.description }}
      </p>
    </div>
    <div
      v-if="post.cover"
      class="w-full rounded-md my-8"
    >
      <img
        :src="`/writings/${post.cover}`"
        alt="Writing cover"
      >
    </div>
    <UDivider
      class="mt-8"
      icon="i-ph-pencil-line-duotone"
    />
    <article class="mt-8">
      <ContentRenderer :value="post">
        <ContentRendererMarkdown
          :value="post"
          class="!max-w-none prose dark:prose-invert"
        />
      </ContentRenderer>
      <UDivider
        class="my-16"
        icon="i-ph-hands-clapping-duotone"
      />
      <div class="space-y-8">
        <p>
          Thanks for reading this post! If you liked it, please consider sharing it with your friends. <strong>Don't
            forget to leave a like!</strong>
        </p>
        <div class="flex gap-4 items-center flex-wrap">
          <UButton
            :label="postDB?.likes > 1 ? `${postDB?.likes} likes` : `${postDB?.likes} like`"
            color="red"
            icon="i-ph-heart-duotone"
            size="lg"
            variant="outline"
            @click.prevent="handleLike()"
          />
          <UButton
            color="white"
            icon="i-ph-arrow-fat-lines-up-duotone"
            label="Go to top"
            size="lg"
            variant="solid"
            @click.prevent="top()"
          />
          <UButton
            v-if="copied"
            color="green"
            icon="i-ph-check-square-duotone"
            label="Link copied"
            size="lg"
            variant="outline"
            @click.prevent="copy()"
          />
          <UButton
            v-else
            color="white"
            icon="i-ph-square-duotone"
            label="Copy link"
            size="lg"
            variant="solid"
            @click.prevent="copy()"
          />
        </div>
      </div>
    </article>
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
