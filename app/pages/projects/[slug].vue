<script lang="ts" setup>
const route = useRoute()
const { data: project } = await useAsyncData(`projects/${route.params.slug}`, () =>
  queryCollection('projects').path(`/projects/${route.params.slug}`).first())

const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: project.value?.title,
  description: project.value?.description,
  author: 'Arthur Danjou',
})

function top() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

const { copy, copied } = useClipboard({
  source: `https://arthurdanjou.fr/projects/${route.params.slug}`,
  copiedDuring: 4000,
})
</script>

<template>
  <main v-if="project">
    <div class="flex">
      <NuxtLinkLocale
        class="flex items-center gap-2 mb-8 group text-sm hover:text-black dark:hover:text-white duration-300"
        to="/projects"
      >
        <UIcon
          class="group-hover:-translate-x-1 transform duration-300"
          name="i-ph-arrow-left-duotone"
          size="20"
        />
        {{ t('back') }}
      </NuxtLinkLocale>
    </div>
    <div class="mt-2">
      <div class="flex items-end justify-between gap-2 flex-wrap">
        <div class="flex items-center gap-2">
          <h1
            class="font-bold text-3xl text-black dark:text-white"
          >
            {{ project.title }}
          </h1>
          <UTooltip
            :text="t('tooltip.favorite')" :content="{
              align: 'center',
              side: 'right',
              sideOffset: 8,
            }"
            arrow
          >
            <UIcon
              v-if="project.favorite"
              name="i-ph-star-duotone"
              size="24"
              class="text-amber-500"
            />
          </UTooltip>
        </div>
        <div
          class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
        >
          <UIcon name="ph:calendar-duotone" size="16" />
          <p>{{ useDateFormat(project.publishedAt, 'DD MMMM YYYY').value }} </p>
        </div>
      </div>
      <p class="mt-2 text-base">
        {{ project.description }}
      </p>
    </div>
    <div
      v-if="project.cover"
      class="w-full rounded-md my-8"
    >
      <ProseImg
        :src="`/projects/${project.cover}`"
        label="Project cover"
      />
    </div>
    <USeparator
      class="my-4"
      icon="i-ph-pencil-line-duotone"
    />
    <PostAlert />
    <ContentRenderer
      :value="project"
      class="!max-w-none prose dark:prose-invert"
    />
    <div class="space-y-4 mt-8">
      <PostFooter />
      <div class="flex gap-4 items-center flex-wrap">
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
    "back": "Go back",
    "link": {
      "copied": "Link copied",
      "copy": "Copy link"
    },
    "top": "Go to top"

  },
  "fr": {
    "back": "Retourner en arrière",
    "link": {
      "copied": "Lien copié",
      "copy": "Copier le lien"
    },
    "top": "Remonter en haut"
  },
  "es": {
    "back": "Volver atrás",
        "link": {
      "copied": "Link copiado",
      "copy": "Copiar link"
    },
    "top": "Ir arribaarr"
  }
}
</i18n>
