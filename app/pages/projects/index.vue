<script lang="ts" setup>
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').where('extension', '=', 'md').order('favorite', 'DESC').order('publishedAt', 'DESC').all()
})

useSeoMeta({
  title: 'Engineering & Research Labs',
  description: 'Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.',
  ogTitle: 'Engineering & Research Labs • Arthur Danjou',
  ogDescription: 'Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.',
  twitterCard: 'summary_large_image'
})

const selectedStatus = ref<string | null>(null)
const selectedTags = ref<string[]>([])

const statuses = computed(() => {
  const allStatuses = new Set<string>()
  projects.value?.forEach((project) => {
    if (project.status) allStatuses.add(project.status)
  })
  return Array.from(allStatuses).sort()
})

const allTags = computed(() => {
  const tags = new Set<string>()
  projects.value?.forEach((project) => {
    project.tags?.forEach((tag: string) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredProjects = computed(() => {
  if (!projects.value) return []

  return projects.value.filter((project) => {
    const statusMatch = !selectedStatus.value || project.status === selectedStatus.value
    const tagsMatch = selectedTags.value.length === 0
      || selectedTags.value.some(tag => project.tags?.includes(tag))
    return statusMatch && tagsMatch
  })
})

const { statusColors, typeColors } = useProjectColors()

function toggleTag(tag: string) {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  }
  else {
    selectedTags.value.push(tag)
  }
}

function clearFilters() {
  selectedStatus.value = null
  selectedTags.value = []
}

const hasActiveFilters = computed(() => !!selectedStatus.value || selectedTags.value.length > 0)
const activeFilterCount = computed(() => (selectedStatus.value ? 1 : 0) + selectedTags.value.length)
</script>

<template>
  <main class="space-y-8">
    <div class="space-y-4">
      <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
        Engineering & Research Labs
      </h1>
      <p class="text-lg text-neutral-600 dark:text-neutral-400">
        Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.
      </p>
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-4 overflow-x-auto flex-nowrap md:flex-wrap w-full whitespace-nowrap">
      <div class="flex gap-2 items-center">
        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Status:</span>
        <UButton
          :variant="!selectedStatus ? 'solid' : 'ghost'"
          color="neutral"
          size="sm"
          @click="selectedStatus = null"
        >
          All
        </UButton>
        <UButton
          v-for="status in statuses"
          :key="status"
          :variant="selectedStatus === status ? 'solid' : 'ghost'"
          :color="(statusColors[status] || 'neutral') as any"
          size="sm"
          @click="selectedStatus = selectedStatus === status ? null : status"
        >
          {{ status }}
        </UButton>
      </div>

      <!-- Ajout: bouton Clear à droite -->
      <div class="ml-auto">
        <UButton
          v-if="hasActiveFilters"
          variant="ghost"
          color="neutral"
          size="sm"
          icon="i-ph-x-circle-duotone"
          aria-label="Clear filters"
          @click="clearFilters"
        >
          Clear filters ({{ activeFilterCount }})
        </UButton>
      </div>
    </div>

    <!-- Tags Filter -->
    <div
      v-if="allTags.length > 0"
      class="grid grid-flow-col grid-rows-3 auto-cols-max gap-2 overflow-x-auto w-full snap-x snap-mandatory md:flex md:flex-wrap md:overflow-visible"
    >
      <UBadge
        v-for="tag in allTags"
        :key="tag"
        :color="selectedTags.includes(tag) ? 'primary' : 'neutral'"
        :variant="selectedTags.includes(tag) ? 'solid' : 'subtle'"
        class="inline-flex items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform shrink-0 snap-start"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </UBadge>

      <!-- Lien Clear mobile -->
      <UButton
        v-if="hasActiveFilters"
        class="md:hidden justify-self-end"
        variant="ghost"
        color="neutral"
        size="xs"
        icon="i-ph-x-circle-duotone"
        aria-label="Clear filters"
        @click="clearFilters"
      >
        Clear
      </UButton>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="project in filteredProjects"
        :key="project.slug"
        :to="`/projects/${project.slug}`"
        class="hover:scale-[1.02] transition-transform cursor-pointer"
      >
        <template #header>
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3 flex-1">
              <UIcon
                v-if="project.icon"
                :name="project.icon"
                class="text-3xl text-neutral-700 dark:text-neutral-300 shrink-0"
              />
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white truncate">
                  {{ project.title }}
                </h3>
                <div class="flex items-center gap-2 mt-1 flex-wrap">
                  <UBadge
                    v-if="project.type"
                    :color="(typeColors[project.type] || 'neutral') as any"
                    variant="subtle"
                    size="xs"
                  >
                    {{ project.type }}
                  </UBadge>
                  <UBadge
                    v-if="project.status"
                    :color="(statusColors[project.status] || 'neutral') as any"
                    variant="subtle"
                    size="xs"
                  >
                    {{ project.status }}
                  </UBadge>
                  <UBadge
                    v-if="project.favorite"
                    color="amber"
                    variant="subtle"
                    size="xs"
                  >
                    ⭐ Favorite
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </template>

        <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {{ project.description }}
        </p>

        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="tag in project.tags?.slice(0, 3)"
                :key="tag"
                color="neutral"
                variant="outline"
                size="xs"
              >
                {{ tag }}
              </UBadge>
              <UBadge
                v-if="project.tags && project.tags.length > 3"
                color="neutral"
                variant="outline"
                size="xs"
              >
                +{{ project.tags.length - 3 }}
              </UBadge>
            </div>
            <span
              v-if="project.readingTime"
              class="text-xs text-neutral-500 dark:text-neutral-400"
            >
              {{ project.readingTime }} min read
            </span>
          </div>
        </template>
      </UCard>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredProjects.length === 0"
      class="text-center py-12"
    >
      <UIcon
        name="i-ph-folder-open-duotone"
        class="text-6xl text-neutral-400 dark:text-neutral-600 mb-4"
      />
      <p class="text-lg text-neutral-600 dark:text-neutral-400">
        No projects found with the selected filters.
      </p>
      <UButton
        class="mt-4"
        @click="clearFilters"
      >
        Clear Filters
      </UButton>
    </div>
  </main>
</template>
