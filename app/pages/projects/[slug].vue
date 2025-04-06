<script lang="ts" setup>
const route = useRoute()
const { data: project } = await useAsyncData(`projects/${route.params.slug}`, () =>
  queryCollection('projects').path(`/projects/${route.params.slug}`).first())

const { locale } = useI18n()
const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: project.value?.title,
  description: project.value?.description,
  author: 'Arthur Danjou',
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
        <h1
          class="font-bold text-3xl text-black dark:text-white"
        >
          {{ project.title }}
        </h1>
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
    <UAlert
      v-if="locale !== 'en'"
      :description="t('alert.description')"
      :title="t('alert.title')"
      class="mb-8"
      color="red"
      icon="i-ph-warning-duotone"
      variant="outline"
    />
    <ContentRenderer
      :value="project"
      class="!max-w-none prose dark:prose-invert"
    />
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
    "alert": {
      "title": "Translations alert!",
      "description": "Due to time constraints, all article translations will be available only in English. Thank you for your understanding."
    },
    "back": "Go back"
  },
  "fr": {
    "alert": {
      "title": "Attentions aux traductions!",
      "description": "Par soucis de temps, toutes les traductions des articles seront disponibles uniquement en anglais. Merci de votre compréhension."
    },
    "back": "Retourner en arrière"
  },
  "es": {
    "alert": {
      "title": "Cuidado con las traducciones!",
      "description": " Por problemas de tiempo, los artículos solo están disponibles en inglés. Gracias por vuestra comprensión.ug ñeóicula."
    },
    "back": "Volver atrás"
  }
}
</i18n>
