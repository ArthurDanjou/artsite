<script lang="ts" setup>
const { skills } = await useContent()
</script>

<template>
  <section
    v-if="skills"
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
      <div class>
        <h3 class="text-xl md:text-2xl font-semibold tracking-tight">
          {{ skill.name }}
        </h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          {{ skill.description }}
        </p>
        <div class="flex flex-wrap gap-2 mt-4">
          <UBadge
            v-for="item in skill.items"
            :key="item.name"
            :icon="item.icon"
            variant="soft"
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
</template>
