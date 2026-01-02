<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string

const { data: project } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection('projects').where('extension', '=', 'md').where('slug', '=', slug).first()
})

if (!project.value) {
  throw createError({
    statusCode: 404,
    message: 'Project not found'
  })
}

const projectWithBody = computed(() => {
  if (!project.value) return null
  return {
    ...project.value,
    body: project.value.meta?.body
  }
})

useSeoMeta({
  title: project.value.title,
  description: project.value.description,
  ogTitle: `${project.value.title} • Arthur Danjou`,
  ogDescription: project.value.description,
  twitterCard: 'summary_large_image',
  twitterTitle: project.value.title,
  twitterDescription: project.value.description
})

defineOgImageComponent('NuxtSeo', {
  title: project.value.title,
  description: project.value.description,
  subtitle: project.value.type ? `Project Type: ${project.value.type}` : '',
  theme: '#F43F5E'
})

const { statusColors, typeColors } = useProjectColors()

const formattedDate = computed(() => {
  if (!project.value?.publishedAt) return null
  return new Date(project.value.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <main
    v-if="project"
    class="space-y-8"
  >
    <div>
      <UButton
        to="/projects"
        variant="ghost"
        color="neutral"
        icon="i-ph-arrow-left"
        size="sm"
      >
        Back to Projects
      </UButton>
    </div>

    <div class="space-y-4">
      <div class="flex items-start gap-4">
        <UIcon
          v-if="project.icon"
          :name="project.icon"
          class="text-5xl text-neutral-700 dark:text-neutral-300 shrink-0"
        />
        <div class="flex-1">
          <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
            {{ project.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-2 mb-4">
            <UBadge
              v-if="project.type"
              :color="(typeColors[project.type] || 'neutral') as any"
              variant="subtle"
            >
              {{ project.type }}
            </UBadge>
            <UBadge
              v-if="project.status"
              :color="(statusColors[project.status] || 'neutral') as any"
              variant="subtle"
            >
              {{ project.status }}
            </UBadge>
            <UBadge
              v-if="project.favorite"
              color="amber"
              variant="subtle"
            >
              ⭐ Favorite
            </UBadge>
          </div>

          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap items-center gap-4 mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span
              v-if="formattedDate"
              class="flex items-center gap-1"
            >
              <UIcon name="i-ph-calendar-duotone" />
              {{ formattedDate }}
            </span>
            <span
              v-if="project.readingTime"
              class="flex items-center gap-1"
            >
              <UIcon name="i-ph-clock-duotone" />
              {{ project.readingTime }} min read
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="project.tags && project.tags.length > 0"
        class="flex flex-wrap gap-2 pt-2"
      >
        <UBadge
          v-for="tag in project.tags"
          :key="tag"
          color="neutral"
          variant="subtle"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <USeparator />

    <ContentRenderer
      v-if="projectWithBody"
      :value="projectWithBody"
      class="prose dark:prose-invert max-w-none
             prose-headings:font-bold prose-headings:text-neutral-900 dark:prose-headings:text-white
             prose-p:text-neutral-700 dark:prose-p:text-neutral-300
             prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
             prose-strong:text-neutral-900 dark:prose-strong:text-white
             prose-code:text-neutral-800 dark:prose-code:text-neutral-200
             prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800
             prose-ul:text-neutral-700 dark:prose-ul:text-neutral-300
             prose-ol:text-neutral-700 dark:prose-ol:text-neutral-300
             prose-li:text-neutral-700 dark:prose-li:text-neutral-300
             prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-700
             prose-blockquote:text-neutral-700 dark:prose-blockquote:text-neutral-400
             prose-img:rounded-lg prose-img:shadow-lg"
    >
      <template #empty>
        <p class="text-neutral-600 dark:text-neutral-400">
          No content available
        </p>
      </template>
    </ContentRenderer>
  </main>
</template>
