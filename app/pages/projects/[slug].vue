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
    <div class="mt-16 flex gap-8 items-start p-8 border border-gray-200 dark:border-neutral-700 rounded-md">
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
        <template #name>
          <strong class="text-neutral-800 dark:text-neutral-200">{{ t('name') }}</strong>
        </template>
        <template #jump>
          <br> <br>
        </template>
      </i18n-t>
    </div>
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
    "back": "Go back",
    "thanks": "Hi! I'm {name}, a Master's student in Applied Mathematics with a passion for AI, statistics, and building cool things with code. {jump} I love turning ideas into real, working systems—whether it's a machine learning model, a self-hosted service, or a data-driven project.{jump} This project is part of my journey to explore and apply what I learn every day. I share it here hoping it'll inspire or help others, just like I've been inspired by the open-source and tech communities. {jump} Feel free to reach out on {linkedin} or {github} if you have questions, feedback, or just want to connect!",
    "name": "Arthur"

  },
  "fr": {
    "alert": {
      "title": "Attentions aux traductions!",
      "description": "Par soucis de temps, toutes les traductions des articles seront disponibles uniquement en anglais. Merci de votre compréhension."
    },
    "back": "Retourner en arrière",
    "thanks": "Bonjour ! Je suis {name}, étudiant en Master de Mathématiques Appliquées avec une passion pour l'IA, les statistiques et la création de projets intéressants avec du code. {jump} J'adore transformer des idées en systèmes réels et fonctionnels, que ce soit un modèle de machine learning, un service auto-hébergé ou un projet basé sur les données. {jump} Ce projet fait partie de mon parcours pour explorer et appliquer ce que j'apprends chaque jour. Je le partage ici dans l'espoir qu'il inspire ou aide d'autres personnes, tout comme j'ai été inspiré par les communautés open-source et tech. {jump} N'hésitez pas à me contacter sur {linkedin} ou {github} si vous avez des questions, des retours ou si vous souhaitez simplement échanger !",
    "name": "Arthur"
  },
  "es": {
    "alert": {
      "title": "Cuidado con las traducciones!",
      "description": " Por problemas de tiempo, los artículos solo están disponibles en inglés. Gracias por vuestra comprensión.ug ñeóicula."
    },
    "back": "Volver atrás",
    "thanks": "¡Hola! Soy {name}, estudiante de Máster en Matemáticas Aplicadas con una pasión por la IA, la estadística y la creación de cosas interesantes con código. {jump} Me encanta convertir ideas en sistemas reales y funcionales, ya sea un modelo de aprendizaje automático, un servicio autoalojado o un proyecto basado en datos. {jump} Este proyecto forma parte de mi camino para explorar y aplicar lo que aprendo cada día. Lo comparto aquí con la esperanza de que inspire o ayude a otros, así como yo he sido inspirado por las comunidades de código abierto y tecnología. {jump} No dudes en contactarme en {linkedin} o {github} si tienes preguntas, comentarios o simplemente quieres conectar!",
    "name": "Arthur"
  }
}
</i18n>
