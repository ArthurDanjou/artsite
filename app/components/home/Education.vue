<script lang="ts" setup>
const { education } = await useContent()

const formatDate = (iso?: string) => {
  if (!iso) return 'Present'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return useDateFormat(d, 'MMM YYYY', { locales: 'en-US' }).value
}
</script>

<template>
  <section
    v-if="education && education.length"
    class="my-8 space-y-6"
    aria-labelledby="education-title"
  >
    <h2
      id="education-title"
      class="sr-only"
    >
      Education
    </h2>

    <div class="grid gap-4 grid-cols-1">
      <UCard
        v-for="item in education"
        :key="item.id"
        variant="outline"
        color="neutral"
      >
        <div>
          <h3 class="text-lg md:text-xl font-semibold tracking-tight">
            {{ item.degree ?? item.title }}
          </h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            {{ item.institution }}
          </p>
          <p class="text-sm text-neutral-700 dark:text-neutral-300 flex flex-wrap items-center gap-2">
            <span class="font-medium">Dates:</span>
            <span>{{ formatDate(item.startDate) }} — {{ formatDate(item.endDate) }}</span>
            <span
              v-if="item.duration"
              class="text-neutral-500"
            >({{ item.duration }})</span>
          </p>
          <p
            class="text-sm text-neutral-700 dark:text-neutral-300 mt-1"
          >
            <span class="font-medium">Location:</span> {{ item.location }}
          </p>
          <p
            class="text-sm text-neutral-700 dark:text-neutral-300 mt-3"
          >
            {{ item.description }}
          </p>
        </div>
      </UCard>
    </div>
  </section>
</template>
