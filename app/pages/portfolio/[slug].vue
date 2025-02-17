<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(`portfolio/${route.params.slug}`, () =>
  queryCollection('portfolio').path(`/portfolio/${route.params.slug}`).first())

const {
  data: postDB,
  refresh,
} = await useAsyncData(`portfolio/${route.params.slug}/db`, () => $fetch(`/api/posts/${route.params.slug}`, { method: 'POST' }))

const { locale } = useI18n()
const { t } = useI18n({
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
  source: `https://arthurdanjou.fr/portfolio/${route.params.slug}`,
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
</script>

<template>
  <main v-if="post && postDB">
    <div class="flex">
      <NuxtLinkLocale
        class="flex items-center gap-2 mb-8 group text-sm hover:text-black dark:hover:text-white duration-300"
        to="/portfolio"
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
    <div v-if="post.body.toc && post.body.toc.links.length > 0" class="flex justify-end sticky top-0 z-50">
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
          color="neutral"
          variant="solid"
          class="mt-2"
        />

        <template #content>
          <div class="text-neutral-500 p-2">
            <div
              v-for="link in post!.body!.toc!.links"
              :key="link.id"
              class="inline"
            >
              <UButton
                size="lg"
                :label="link.text"
                :to="`#${link.id}`"
                variant="link"
                color="neutral"
                :block="true"
                class="flex justify-start items-start"
              />
              <ol class="flex flex-col ml-2 list-decimal list-inside">
                <UButton
                  v-for="child in link.children" :key="child.id"
                  size="sm"
                  :label="child.text"
                  :to="`#${child.id}`"
                  variant="link"
                  color="neutral"
                  :block="true"
                  class="px-4 flex justify-start items-start"
                />
              </ol>
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <div
      v-if="post.cover"
      class="w-full rounded-md mb-8"
    >
      <NuxtImg
        :src="`/portfolio/${post.cover}`"
        alt="Writing cover"
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
      <USeparator
        class="my-16"
        icon="i-ph-hands-clapping-duotone"
      />
      <div class="space-y-8">
        <i18n-t
          keypath="thanks"
          tag="p"
        >
          <template #like>
            <strong>{{ t('like') }}</strong>
          </template>
        </i18n-t>
        <div class="flex gap-4 items-center flex-wrap">
          <UButton
            :label="postDB?.likes > 1 ? `${postDB?.likes} likes` : `${postDB?.likes} like`"
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
  @apply no-underline;
}

.katex-html {
  display: none;
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
    "thanks": "Thanks for reading this post! If you liked it, please consider sharing it with your friends. {like}",
    "like": "Don't forget to leave a like!",
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
    "thanks": "Merci d'avoir lu cet article! Si vous l'avez aimé, n'hésitez pas à le partager avec vos amis. {like}",
    "like": "N'oubliez pas de laisser un like!",
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
      "description": " Por problemas de tiempo, los artículos solo están disponibles en inglés. Gracias por vuestra comprensión.ug ñeóicula."
    },
    "thanks": "Muchas gracias por leer este postougracoias afic! Si te ha gustado, no dudes en compartirlo con tus amigos.tsaf. {like}",
    "like": "No te olvides de dejar un like!",
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
