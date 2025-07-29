<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(`writings/${route.params.slug}`, () =>
  queryCollection('writings').path(`/writings/${route.params.slug}`).first())

const {
  data: postDB,
  refresh,
} = await useAsyncData(`writings/${route.params.slug}/db`, () => $fetch(`/api/posts/${route.params.slug}`, { method: 'POST' }))

const { t, locale } = useI18n({
  useScope: 'local',
})

function top() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

const { copy, copied } = useClipboard({
  source: `https://arthurdanjou.fr/writings/${route.params.slug}`,
  copiedDuring: 4000,
})

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
  author: 'Arthur Danjou',
})

function getDetails() {
  const likes = postDB.value?.likes ?? 0
  const views = postDB.value?.views ?? 0

  const like = likes > 1 ? t('likes.many') : t('likes.one')
  const view = views > 1 ? t('views.many') : t('views.one')

  return {
    likes: `${likes} ${like}`,
    views: `${views} ${view}`,
  }
}

const likeCookie = useCookie<boolean>(`post:like:${route.params.slug}`, {
  maxAge: 7200,
})

async function handleLike() {
  if (likeCookie.value)
    return
  await $fetch(`/api/posts/like/${route.params.slug}`, { method: 'PUT' })
  await refresh()
  likeCookie.value = true
}

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <main v-if="post && postDB">
    <div class="flex">
      <NuxtLinkLocale
        class="flex items-center gap-2 mb-8 group text-sm hover:text-black dark:hover:text-white duration-300"
        to="/writings"
      >
        <UIcon
          class="group-hover:-translate-x-1 transform duration-300"
          name="i-ph-arrow-left-duotone"
          size="20"
        />
        {{ t('back') }}
      </NuxtLinkLocale>
    </div>
    <UAlert
      v-if="locale !== 'en'"
      :description="t('alert.description')"
      :title="t('alert.title')"
      class="mb-8"
      color="red"
      icon="i-ph-warning-duotone"
      variant="outline"
    />
    <div class="border-l-2 pl-2 rounded-none border-gray-300 dark:border-neutral-700 flex gap-1 items-center">
      <UIcon name="i-ph-heart-duotone" size="16" />
      <p>{{ getDetails().likes }} </p>·
      <UIcon name="i-ph-eye-duotone" size="16" />
      <p>{{ getDetails().views }}</p>
    </div>
    <div class="mt-2">
      <div class="flex items-end gap-4 flex-wrap">
        <h1
          class="font-bold text-3xl text-black dark:text-white"
        >
          {{ post.title }}
        </h1>
        <div
          class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
        >
          <UIcon name="ph:calendar-duotone" size="16" />
          <p>{{ useDateFormat(post.publishedAt, 'DD MMMM YYYY').value }} </p>·
          <UIcon name="ph:timer-duotone" size="16" />
          <p>{{ post.readingTime }}min long</p>
        </div>
      </div>
      <p class="my-4 text-base">
        {{ post.description }}
      </p>
    </div>
    <div v-if="post.body.toc && post.body.toc.links.length > 0" class="pt-4 top-0 flex justify-end sticky z-50">
      <UPopover
        mode="click"
        :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8,
        }"
      >
        <UButton
          :label="t('toc')"
          variant="solid"
          color="neutral"
          class="cursor-pointer"
        />

        <template #content>
          <div class="p-2 z-50 flex flex-col gap-y-2">
            <div
              v-for="link in post!.body!.toc!.links"
              :key="link.id"
              class="inline"
            >
              <UButton
                size="lg"
                :label="link.text"
                variant="ghost"
                color="neutral"
                :block="true"
                class="flex justify-start items-start p-1 cursor-pointer"
                @click="scrollToSection(link.id)"
              />
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <div
      v-if="post.cover"
      class="w-full rounded-md mb-8"
    >
      <ProseImg
        :src="`/writings/${post.cover}`"
        label="Writing cover"
      />
    </div>
    <USeparator
      class="mt-4"
      icon="i-ph-pencil-line-duotone"
    />
    <article class="mt-8">
      <ContentRenderer
        :value="post"
        class="!max-w-none prose dark:prose-invert"
      />
      <div class="space-y-4 mt-8">
        <PostFooter />
        <div class="flex gap-4 items-center flex-wrap">
          <UButton
            :label="(postDB?.likes ?? 0) > 1 ? `${postDB?.likes ?? 0} likes` : `${postDB?.likes ?? 0} like`"
            :color="likeCookie ? 'red' : 'neutral'"
            icon="i-ph-heart-duotone"
            size="lg"
            :variant="likeCookie ? 'solid' : 'outline'"
            @click.prevent="handleLike()"
          />
          <UButton
            color="neutral"
            icon="i-ph-arrow-fat-lines-up-duotone"
            :label="t('top')"
            size="lg"
            variant="outline"
            @click.prevent="top()"
          />
          <UButton
            v-if="copied"
            color="green"
            icon="i-ph-check-square-duotone"
            :label="t('link.copied')"
            size="lg"
            variant="outline"
            @click.prevent="copy()"
          />
          <UButton
            v-else
            color="neutral"
            icon="i-ph-square-duotone"
            :label="t('link.copy')"
            size="lg"
            variant="outline"
            @click.prevent="copy()"
          />
        </div>
      </div>
    </article>
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a,
.prose h4 a {
  text-decoration: none;
}

.prose img {
  margin: 0;
}

.katex-html {
  display: none;
}

html {
  scroll-behavior: smooth;
}
</style>

<i18n lang="json">
{
  "en": {
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
    },
    "link": {
      "copied": "Link copied",
      "copy": "Copy link"
    },
    "top": "Go to top",
    "back": "Go back",
    "toc": "Table of contents"
  },
  "fr": {
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
    },
    "link": {
      "copied": "Lien copié",
      "copy": "Copier le lien"
    },
    "top": "Remonter en haut",
    "back": "Retourner en arrière",
    "toc": "Table des matières"
  },
  "es": {
    "likes": {
      "one": "like",
      "many": "likes"
    },
    "views": {
      "one": "view",
      "many": "views"
    },
    "alert": {
      "title": "Cuidado con las traducciones!",
      "description": "Por problemas de tiempo, los artículos solo están disponibles en inglés. Gracias por vuestra comprensión.ug ñeóicula."
    },
    "link": {
      "copied": "Link copiado",
      "copy": "Copiar link"
    },
    "top": "Ir arribaarr",
    "back": "Volver atrás",
    "toc": "Tabla de contenidos"
  }
}
</i18n>
