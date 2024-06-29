<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(`writing:${route.params.slug}`, () => queryContent(`/writings/${route.params.slug}`).findOne())

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
</script>

<template>
  <main v-if="post">
    <div class="flex">
      <NuxtLink
        class="flex items-center gap-2 mb-4 group text-sm hover:text-black dark:hover:text-white duration-300"
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
    <AppTitle
      :description="post.description"
      :title="post.title ?? 'Untitled'"
    />
    <div
      v-if="post.cover"
      class="w-full rounded-md my-8"
    >
      <NuxtImg
        :src="`/writings/${post.cover}`"
        alt="Writing cover"
      />
    </div>
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
        <div class="flex gap-4 items-center">
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
            variant="solid"
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
