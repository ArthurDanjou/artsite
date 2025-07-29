<script setup lang="ts">
import { TAGS } from '~~/types'

const { t } = useI18n({
  useScope: 'local',
})
useSeoMeta({
  title: 'My Projects',
  description: t('description'),
})

const { data: projects } = await useAsyncData('all-projects', () => {
  return queryCollection('projects')
    .order('favorite', 'DESC')
    .order('publishedAt', 'DESC')
    .all()
})
</script>

<template>
  <main class="space-y-12">
    <AppTitle
      :description="t('description')"
      :title="t('title')"
    />
    <PostAlert />
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <NuxtLink
        v-for="(project, id) in projects"
        :key="id"
        :to="project.path"
      >
        <li
          class="flex flex-col h-full group hover:bg-gray-100/50 duration-300 p-2 rounded-lg dark:hover:bg-neutral-800/50 transition-colors justify-center"
        >
          <article class="space-y-2">
            <div
              class="flex flex-col"
            >
              <div class="flex items-center gap-2">
                <h1 class="font-bold duration-300 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white">
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
                    size="16"
                    class="text-amber-500 hover:rotate-360 duration-500"
                  />
                </UTooltip>
              </div>
              <h3 class="text-md text-neutral-500 dark:text-neutral-400 italic">
                {{ project.description }}
              </h3>
            </div>
          </article>
          <div class="flex flex-col sm:flex-row sm:items-center mt-1">
            <div
              class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
            >
              <ClientOnly>
                <p>{{ useDateFormat(project.publishedAt, 'DD MMM YYYY').value }} </p>
              </ClientOnly>
              <span class="w-2" />
              <div class="flex gap-2 flex-wrap">
                <ClientOnly>
                  <UBadge
                    v-for="tag in project.tags.sort((a: any, b: any) => a.localeCompare(b))"
                    :key="tag"
                    variant="soft"
                    size="sm"
                  >
                    {{ TAGS.find(color => color.label.toLowerCase() === tag)?.label }}
                  </UBadge>
                </ClientOnly>
              </div>
            </div>
          </div>
        </li>
      </NuxtLink>
    </ul>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "title": "All my projects I have worked on, both academic and personal",
    "description": "A collection of my projects using R, Python, or web development technologies. These projects span various domains, including data analysis, machine learning, and web applications, showcasing my skills in coding, problem-solving, and project development.",
    "tooltip": {
      "favorite": "This project is one of my favorites"
    }
  },
  "fr": {
    "title": "Tous mes projets auxquels j'ai travaillé, académiques et personnels",
    "description": "Une collection de mes projets réalisés en R, Python, ou en développement web. Ces projets couvrent divers domaines, y compris l'analyse de données, l'apprentissage automatique et les applications web, mettant en avant mes compétences en codage, résolution de problèmes et développement de projets.",
    "tooltip": {
      "favorite": "Ce projet est l'un de mes favoris"
    }
  },
  "es": {
    "title": "Todos mis proyectos en los que he trabajado, académicos y personales",
    "description": "Una colección de mis proyectos realizados en R, Python o tecnologías de desarrollo web. Estos proyectos abarcan diversos campos, como análisis de datos, aprendizaje automático y aplicaciones web, mostrando mis habilidades en programación, resolución de problemas y desarrollo de proyectos.",
    "tooltip": {
      "favorite": "Este proyecto es uno de mis favoritos"
    }
  }
}
</i18n>
