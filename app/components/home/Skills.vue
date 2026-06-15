<script lang="ts" setup>
const { skills } = await useContent()
</script>

<template>
  <ClientOnly>
    <section
      v-if="skills?.body?.length"
      class="my-8 space-y-6"
      aria-labelledby="skills-title"
    >
      <h2
        id="skills-title"
        class="sr-only"
      >
        Skills
      </h2>

      <div
        v-for="skill in skills.body"
        :key="skill.id"
      >
        <div>
          <h3 class="text-xl md:text-2xl font-semibold tracking-tight">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ skill.description }}
          </p>
          <div class="flex flex-wrap gap-2 mt-4">
            <UBadge
              v-for="item in skill.items"
              :key="item.name"
              :icon="item.icon"
              variant="soft"
              size="lg"
              color="primary"
              class="transition-colors duration-200 hover:opacity-80"
              :aria-label="item.name"
            >
              {{ item.name }}
            </UBadge>
          </div>
        </div>
      </div>
    </section>

    <template #fallback>
      <div class="my-8 space-y-6">
        <div
          v-for="i in 4"
          :key="i"
          class="space-y-3"
        >
          <USkeleton class="h-6 w-1/3" />
          <USkeleton class="h-4 w-2/3" />
          <div class="flex flex-wrap gap-2 mt-4">
            <USkeleton
              v-for="j in 5"
              :key="j"
              class="h-8 w-24 rounded-full"
            />
          </div>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
