<script lang="ts" setup>
const { talks } = await useContent()

const head = {
  title: 'Speaking & Academic Presentations',
  description: 'My first academic talk — a seminar on Byzantine-resilient aggregation rules at CMAP, Ecole Polytechnique. Open to invitations.',
  headline: 'Arthur Danjou\u2019s Talks'
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

const upcoming = computed(() => talks?.body?.filter(t => !t.slides) ?? [])
const past = computed(() => talks?.body?.filter(t => t.slides) ?? [])
</script>

<template>
  <main class="space-y-8">
    <div class="flex flex-col items-center justify-center gap-4">
      <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
        Speaking
      </h1>
      <p class="max-w-3xl leading-relaxed text-center text-neutral-600 dark:text-neutral-400">
        My first academic talk is scheduled for September 2026. I am open to presenting at seminars, workshops, and reading groups.
      </p>
      <UButton
        size="md"
        label="See my talks on Github"
        variant="soft"
        color="neutral"
        icon="i-ph-github-logo"
        to="https://go.arthurdanjou.fr/talks"
        target="_blank"
      />
    </div>

    <div
      v-if="talks?.body?.length"
      class="space-y-6"
    >
      <section v-if="upcoming.length">
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

      <section v-if="past.length">
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

    <p class="text-center text-sm text-neutral-500">
      Interested in having me present? Reach out via the contact dropdown.
    </p>
  </main>
</template>
