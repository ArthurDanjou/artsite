<script lang="ts" setup>
const { experiences } = await useContent()

const formatDate = (iso?: string) => {
  if (!iso) return 'Present'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return useDateFormat(d, 'MMM YYYY', { locales: 'en-US' }).value
}
</script>

<template>
  <section
    v-if="experiences && experiences.length"
    class="my-8 space-y-6"
    aria-labelledby="experiences-title"
  >
    <h2
      id="experiences-title"
      class="sr-only"
    >
      Experiences
    </h2>

    <div class="grid gap-4 grid-cols-1">
      <UCard
        v-for="item in experiences"
        :key="item.id"
        variant="outline"
        color="neutral"
      >
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <div
              v-if="item.emoji"
              class="text-2xl leading-none"
            >
              {{ item.emoji }}
            </div>
            <div class="flex-1">
              <h3 class="text-lg md:text-xl font-semibold tracking-tight">
                {{ item.title }}<span
                  v-if="item.type"
                  class="text-md text-neutral-500 font-normal"
                >  ·  {{ item.type }}</span>
              </h3>
              <p class="text-sm text-neutral-700 dark:text-neutral-300">
                <span class="font-medium mr-2">Company:</span>
                <span
                  v-if="item.companyUrl"
                  class="underline decoration-neutral-400/70 underline-offset-4 hover:decoration-neutral-600 dark:hover:decoration-neutral-300"
                >
                  <NuxtLink
                    :to="item.companyUrl"
                    target="_blank"
                    rel="noreferrer"
                  >{{ item.company }}</NuxtLink>
                </span>
                <span v-else>{{ item.company }}</span>
              </p>
            </div>
          </div>

          <p class="text-sm text-neutral-700 dark:text-neutral-300 flex flex-wrap items-center gap-2">
            <span class="font-medium">Dates:</span>
            <span>{{ formatDate(item.startDate) }} — {{ formatDate(item.endDate) }}</span>
            <span
              v-if="item.duration"
              class="text-neutral-500"
            >({{ item.duration }})</span>
          </p>

          <p class="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
            <span class="font-medium">Location:</span>
            <span>{{ item.location }}</span>
          </p>

          <p class="text-sm text-neutral-700 dark:text-neutral-300">
            {{ item.description }}
          </p>

          <div
            v-if="item.tags?.length"
            class="flex flex-wrap gap-2"
          >
            <UBadge
              v-for="tag in item.tags"
              :key="tag"
              size="sm"
              variant="soft"
              color="primary"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>
