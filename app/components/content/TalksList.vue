<script lang="ts" setup>
const { talks } = await useContent()

const upcoming = computed(() =>
  talks?.body?.filter(t => !t.slides) ?? []
)

const past = computed(() =>
  talks?.body?.filter(t => t.slides) ?? []
)
</script>

<template>
  <div
    v-if="talks?.body?.length"
    class="space-y-6"
  >
    <section
      v-if="upcoming.length"
      class="space-y-4"
    >
      <h2 class="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
        Upcoming
      </h2>
      <div class="space-y-4">
        <TalkCard
          v-for="talk in upcoming"
          :key="talk.id"
          :title="talk.title"
          :date="talk.date"
          :venue="talk.venue"
          :description="talk.description"
          :icon="talk.icon"
          :slides="talk.slides ?? undefined"
        />
      </div>
    </section>

    <section
      v-if="past.length"
      class="space-y-4"
    >
      <h2 class="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
        Past Talks
      </h2>
      <div class="space-y-4">
        <TalkCard
          v-for="talk in past"
          :key="talk.id"
          :title="talk.title"
          :date="talk.date"
          :venue="talk.venue"
          :description="talk.description"
          :icon="talk.icon"
          :slides="talk.slides ?? undefined"
        />
      </div>
    </section>
  </div>
</template>
