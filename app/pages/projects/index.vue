<script lang="ts" setup>
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .where('extension', '=', 'md')
    .order('favorite', 'DESC')
    .order('publishedAt', 'DESC')
    .all()
})

useSeoMeta({
  title: 'Engineering & Research Labs',
  description: 'Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.',
  ogTitle: 'Engineering & Research Labs • Arthur Danjou',
  ogDescription: 'Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.',
  twitterCard: 'summary_large_image'
})

const { statusColors, typeColors } = useProjectColors()

const selectedType = ref<string | null>(null)
const selectedStatus = ref<string | null>(null)

const availableTypes = computed(() => {
  const types = new Set<string>()
  projects.value?.forEach((project) => {
    if (project.type) types.add(project.type)
  })
  return Array.from(types).sort()
})

const availableStatuses = computed(() => {
  const statuses = new Set<string>()
  projects.value?.forEach((project) => {
    if (project.status) statuses.add(project.status)
  })
  return Array.from(statuses).sort()
})

const filteredProjects = computed(() => {
  if (!projects.value) return []

  return projects.value.filter((project) => {
    const typeMatch = !selectedType.value || project.type === selectedType.value
    const statusMatch = !selectedStatus.value || project.status === selectedStatus.value
    return typeMatch && statusMatch
  })
})

function clearFilters() {
  selectedType.value = null
  selectedStatus.value = null
}

const hasActiveFilters = computed(() => !!selectedType.value || !!selectedStatus.value)
const activeFilterCount = computed(() => (selectedType.value ? 1 : 0) + (selectedStatus.value ? 1 : 0))
</script>

<template>
  <main class="space-y-8 py-4">
    <div class="space-y-4">
      <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
        Engineering & Research Labs
      </h1>
      <p class="max-w-3xl leading-relaxed">
        Bridging the gap between theoretical models and production systems. Explore my experimental labs, open-source contributions, and engineering work.
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2 overflow-x-auto w-full whitespace-nowrap pb-2">
        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mr-2 min-w-12.5">Type:</span>
        <UButton
          :variant="!selectedType ? 'solid' : 'ghost'"
          color="neutral"
          size="sm"
          @click="selectedType = null"
        >
          All
        </UButton>
        <UButton
          v-for="type in availableTypes"
          :key="type"
          :variant="selectedType === type ? 'subtle' : 'ghost'"
          :color="(typeColors[type] || 'neutral') as any"
          size="sm"
          class="transition-all duration-200"
          :class="selectedType === type ? 'ring-1 ring-inset' : ''"
          @click="selectedType = selectedType === type ? null : type"
        >
          {{ type }}
        </UButton>
      </div>

      <div class="flex items-center gap-4 overflow-x-auto flex-nowrap md:flex-wrap w-full whitespace-nowrap pb-2">
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
            v-for="status in availableStatuses"
            :key="status"
            :variant="selectedStatus === status ? 'solid' : 'ghost'"
            :color="(statusColors[status] || 'neutral') as any"
            size="sm"
            @click="selectedStatus = selectedStatus === status ? null : status"
          >
            {{ status }}
          </UButton>
        </div>

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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard
          v-for="project in filteredProjects"
          :key="project.slug"
          class="relative hover:shadow-sm transition-all duration-300 group"
        >
          <template #header>
            <div class="flex items-start gap-4">
              <div
                class="p-2 rounded-lg shrink-0 flex items-center justify-center"
                :class="project.favorite ? 'ring-2 ring-amber-400 text-amber-400' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'"
              >
                <UIcon
                  :name="project.icon || 'i-ph-code-duotone'"
                  class="w-6 h-6"
                />
              </div>

              <div class="flex-1 min-w-0">
                <UTooltip
                  :text="project.title"
                  :popper="{ placement: 'top-start' }"
                  class="w-full relative z-10"
                >
                  <NuxtLink
                    :to="`/projects/${project.slug}`"
                    class="block focus:outline-none"
                  >
                    <h3 class="text-lg font-bold truncate group-hover:text-neutral-900 text-neutral-500 dark:group-hover:text-white transition-colors duration-200">
                      {{ project.title }}
                    </h3>
                  </NuxtLink>
                </UTooltip>

                <div class="flex items-center gap-2 mt-2 flex-wrap relative z-10">
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
                    ⭐
                  </UBadge>
                </div>
              </div>
            </div>
          </template>

          <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
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
                  class="opacity-75"
                >
                  {{ tag }}
                </UBadge>
                <span
                  v-if="project.tags && project.tags.length > 3"
                  class="text-xs text-neutral-400 font-mono ml-1 self-center"
                >
                  +{{ project.tags.length - 3 }}
                </span>
              </div>
              <span
                v-if="project.readingTime"
                class="text-xs text-neutral-400 font-mono flex items-center gap-1 shrink-0 ml-2"
              >
                <UIcon
                  name="i-ph-hourglass-medium-duotone"
                  class="w-3 h-3"
                />
                {{ project.readingTime }}m
              </span>
            </div>
          </template>

          <NuxtLink
            :to="`/projects/${project.slug}`"
            :aria-label="`Open project: ${project.title}`"
            class="absolute inset-0 z-0"
          />
        </UCard>
      </div>

      <div
        v-if="filteredProjects.length === 0"
        class="text-center py-20 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl"
      >
        <UIcon
          name="i-ph-flask-duotone"
          class="text-6xl text-neutral-300 dark:text-neutral-700 mb-4"
        />
        <h3 class="text-lg font-medium text-neutral-900 dark:text-white">
          No experiments found
        </h3>
        <p class="text-neutral-500 dark:text-neutral-400 mb-6">
          No projects match the selected filters.
        </p>
        <UButton
          color="primary"
          variant="soft"
          @click="clearFilters"
        >
          Clear Filters
        </UButton>
      </div>
    </div>
  </main>
</template>
