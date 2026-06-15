<script lang="ts" setup>
import type { ProjectsCollectionItem } from '@nuxt/content'

const head = {
  title: 'Engineering & Research Labs',
  description: 'Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.',
  headline: 'Arthur Danjou\u2019s Projects'
}

useSeoMeta({
  title: head.title,
  description: head.description,
  ogTitle: `${head.title} \u2022 Arthur Danjou`,
  ogDescription: head.description,
  twitterCard: 'summary_large_image',
  twitterTitle: head.title,
  twitterDescription: head.description
})

defineOgImage('Pergel.satori', {
  title: head.title,
  description: head.description,
  headline: head.headline
})

const { data: projectsData } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .where('extension', '=', 'md')
    .order('favorite', 'DESC')
    .order('publishedAt', 'DESC')
    .all()
})

const grouped_projects = computed(() => {
  const groups: Record<string, ProjectsCollectionItem[]> = {}
  projectsData.value?.forEach((project) => {
    const group = project.type || 'Other'
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(project)
  })

  const orderPriority = ['Personal Project', 'Research Project', 'Academic Project']
  const sorted = Object.entries(groups).sort(([keyA], [keyB]) => {
    const indexA = orderPriority.indexOf(keyA)
    const indexB = orderPriority.indexOf(keyB)
    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  return Object.fromEntries(sorted)
})
</script>

<template>
  <main class="space-y-8 py-4">
    <div class="space-y-4">
      <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
        Engineering & Research Labs
      </h1>
      <p class="max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">
        Bridging the gap between theoretical models and production systems. <br>Explore my experimental labs, open-source contributions, and engineering work.
      </p>
      <UButton
        size="md"
        label="See more open source projects on Github"
        variant="soft"
        color="neutral"
        icon="i-ph-github-logo"
        to="https://go.arthurdanjou.fr/github"
      />
    </div>
    <div class="flex flex-col gap-16">
      <div
        v-for="(projects, group) in grouped_projects"
        :key="group"
        class="relative"
      >
        <h1 class="w-full md:w-[110%] mt-4 mb-2 font-bold text-4xl md:text-7xl text-transparent opacity-15 text-stroke-neutral-500 text-stroke-2 md:-translate-x-16">
          {{ group }}
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 grid-rows-auto">
          <ProjectCard
            v-for="project in projects"
            :key="project.slug"
            :to="`/projects/${project.slug}`"
            :title="project.title"
            :description="project.shortDescription"
            :icon="project.icon"
            :tags="project.tags"
            :favorite="project.favorite"
            :status="project.status"
          />
        </div>
      </div>
    </div>
  </main>
</template>
