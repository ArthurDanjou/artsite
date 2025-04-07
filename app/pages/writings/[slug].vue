<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(`writings/${route.params.slug}`, () =>
  queryCollection('writings').path(`/writings/${route.params.slug}`).first())

const {
  data: postDB,
  refresh,
} = await useAsyncData(`writings/${route.params.slug}/db`, () => $fetch(`/api/posts/${route.params.slug}`, { method: 'POST' }))

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
    <div v-if="post.body.toc && post.body.toc.links.length > 0" class="flex justify-end sticky top-0 z-50 !cursor-pointer">
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
                variant="link"
                color="neutral"
                :block="true"
                class="flex justify-start items-start p-1"
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
      <div class="space-y-8 mt-16">
        <div class="flex gap-8 items-start p-8 border border-gray-200 dark:border-neutral-700 rounded-md">
          <NuxtImg
            src="/arthur.webp"
            alt="Arthur Danjou"
            class="w-24 h-24 rounded-full"
          />
          <i18n-t
            keypath="thanks"
            tag="p"
            class="text-neutral-600 dark:text-neutral-400"
          >
            <template #linkedin>
              <HomeLink
                href="https://www.linkedin.com/in/arthurdanjou/"
                icon="i-ph-linkedin-logo-duotone"
                label="LinkedIn"
                target="_blank"
                class="inline-flex items-start gap-1 transform translate-y-1"
              />
            </template>
            <template #github>
              <HomeLink
                href="https://github.com/arthurdanjou"
                icon="i-ph-github-logo-duotone"
                label="GitHub"
                target="_blank"
                class="inline-flex items-start gap-1 transform translate-y-1"
              />
            </template>
            <template #comment>
              <strong class="text-neutral-800 dark:text-neutral-200">{{ t('comment') }}</strong>
            </template>
            <template #name>
              <strong class="text-neutral-800 dark:text-neutral-200">{{ t('name') }}</strong>
            </template>
            <template #jump>
              <br> <br>
            </template>
          </i18n-t>
        </div>
        <div class="flex gap-8 items-center flex-wrap">
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
  @apply no-underline;
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
    "thanks": "Thanks for reading! My name is {name}, and I love writing about AI, data science, and the intersection between mathematics and programming. {jump} I've been coding and exploring math for years, and I'm always learning something new—whether it's self-hosting tools in my homelab, experimenting with machine learning models, or diving into statistical methods. {jump} I share my knowledge here because I know how valuable clear, hands-on resources can be, especially when you're just getting started or exploring something deeply technical. {jump} If you have any questions or just want to chat, feel free to reach out to me on {linkedin} or {github  }. {jump} I hope you enjoyed this post and learned something useful. If you did, {comment}—it really helps and means a lot!",
    "comment": "consider sharing it",
    "name": "Arthur",
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
    "thanks": "Merci de votre lecture ! Je m'appelle {name}, et j'adore écrire sur l'intelligence artificielle, la data science, et tout ce qui se situe à l'intersection entre les mathématiques et la programmation. {jump} Je code et j'explore les maths depuis des années, et j'apprends encore de nouvelles choses chaque jour — que ce soit en auto-hébergeant des outils dans mon homelab, en expérimentant des modèles de machine learning ou en approfondissant des méthodes statistiques. {jump} Je partage mes connaissances ici parce que je sais à quel point des ressources claires, pratiques et accessibles peuvent être précieuses, surtout quand on débute ou qu'on explore un sujet technique en profondeur. {jump} Si vous avez des questions ou simplement envie d'échanger, n'hésitez pas à laisser un commentaire ci-dessous ou à me contacter sur {linkedin} ou {github}. {jump} J'espère que cet article vous a plu et qu'il vous a appris quelque chose d'utile. Si c'est le cas, {comment} — ça m'aide beaucoup et ça me fait vraiment plaisir !",
    "comment": "pensez à le partager",
    "name": "Arthur",
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
    "thanks": "¡Gracias por leer! Me llamo {name} y me encanta escribir sobre inteligencia artificial, ciencia de datos y todo lo que se encuentra en la intersección entre las matemáticas y la programación. {jump} Llevo años programando y explorando las matemáticas, y cada día aprendo algo nuevo — ya sea autoalojando herramientas en mi homelab, experimentando con modelos de aprendizaje automático o profundizando en métodos estadísticos. {jump} Comparto mis conocimientos aquí porque sé lo valiosos que pueden ser los recursos claros, prácticos y accesibles, especialmente cuando uno está empezando o explorando temas técnicos en profundidad. {jump} Si tienes alguna pregunta o simplemente quieres charlar, no dudes en dejar un comentario abajo o contactarme por {linkedin} o {github}. {jump} Espero que este artículo te haya gustado y que hayas aprendido algo útil. Si es así, {comment} — ¡me ayuda mucho y significa mucho para mí!",
    "comment": "considera compartirlo",
    "name": "Arthur",
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
