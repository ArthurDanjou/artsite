<script lang="ts" setup>
import type { ProjectsCollectionItem } from '@nuxt/content'

const head = {
  title: 'Engineering & Research Labs',
  description: 'Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.'
}

useSeoMeta({
  title: head.title,
  description: head.description,
  ogTitle: `${head.title} • Arthur Danjou`,
  ogDescription: head.description,
  twitterCard: 'summary_large_image',
  twitterTitle: head.title,
  twitterDescription: head.description
})

defineOgImageComponent('NuxtSeo', {
  title: head.title,
  description: head.description,
  theme: '#F43F5E'
})

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .where('extension', '=', 'md')
    .order('favorite', 'DESC')
    .order('publishedAt', 'DESC')
    .all()
})

const grouped_projects = computed(() => {
  const groups: Record<string, ProjectsCollectionItem[]> = {}
  projects.value?.forEach((project) => {
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
    <div class="flex flex-col items-center justify-center gap-4">
      <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
        Engineering & Research Labs
      </h1>
      <p class="max-w-3xl leading-relaxed">
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
        <h1 class="mb-2 font-bold text-7xl text-transparent opacity-15 text-stroke-neutral-400 dark:text-stroke-neutral-500 text-stroke-2 -translate-x-8">
          {{ group }}
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 grid-rows-auto">
          <NuxtLink
            v-for="project in projects"
            :key="project.slug"
            :to="`/projects/${project.slug}`"
            :aria-label="`Open project: ${project.title}`"
            class="hover:bg-[#8881] dark:hover:bg-neutral-700/20 duration-500 rounded-lg transition-colors p-4"
          >
            <div class="flex justify-center items-center gap-4 z-50">
              <div>
                <UIcon
                  :name="project.icon"
                  size="40"
                />
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <h1 class="font-bold">
                    {{ project.title }}
                  </h1>
                  <UTooltip
                    text="Favorite"
                    :delay-duration="4"
                  >
                    <UBadge
                      v-if="project.favorite"
                      color="amber"
                      variant="subtle"
                      size="sm"
                      icon="i-ph-star-four-duotone"
                    />
                  </UTooltip>
                  <UTooltip
                    text="In Progress"
                    :delay-duration="4"
                  >
                    <UBadge
                      v-if="project.status === 'in progress'"
                      color="blue"
                      variant="soft"
                      size="sm"
                      icon="i-ph-hourglass-duotone"
                    />
                  </UTooltip>
                  <UTooltip
                    text="Archived"
                    :delay-duration="4"
                  >
                    <UBadge
                      v-if="project.status === 'archived'"
                      color="gray"
                      variant="soft"
                      size="sm"
                      icon="i-ph-archive-duotone"
                    />
                  </UTooltip>
                </div>
                <p class="italic text-xs text-muted">
                  {{ project.shortDescription }}
                </p>
                <div
                  v-if="project.tags?.length"
                  class="flex flex-wrap gap-1.5"
                >
                  <UBadge
                    v-for="tag in project.tags"
                    :key="tag"
                    color="neutral"
                    variant="outline"
                    size="xs"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
              </div>
            </div>
          </nuxtlink>
        </div>
      </div>
    </div>
  </main>
</template>
