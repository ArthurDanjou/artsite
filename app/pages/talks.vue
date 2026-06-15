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

const grouped = computed(() => {
  const groups: Record<string, typeof talks.value.body> = {}
  talks?.body?.forEach((talk) => {
    const yearMatch = talk.date.match(/\d{4}/)
    const key = yearMatch ? yearMatch[0] : 'TBA'
    if (!groups[key]) groups[key] = []
    groups[key].push(talk)
  })
  return Object.entries(groups)
    .sort(([a], [b]) => Number(b) - Number(a))
    .reduce<Record<string, typeof talks.value.body>>((acc, [k, v]) => {
      acc[k] = v as typeof talks.value.body
      return acc
    }, {})
})
</script>

<template>
  <main class="space-y-8 py-4">
    <div class="space-y-4">
      <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
        Speaking
      </h1>
      <p class="max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">
        My first academic talk is scheduled for September 2026. I am open to presenting at seminars, workshops, and reading groups.
      </p>
      <UButton
        size="md"
        label="See my talks on GitHub"
        variant="soft"
        color="neutral"
        icon="i-ph-github-logo"
        to="https://go.arthurdanjou.fr/github"
        target="_blank"
      />
    </div>
    <div
      v-if="talks?.body?.length"
      class="flex flex-col gap-16"
    >
      <div
        v-for="(yearTalks, year) in grouped"
        :key="year"
        class="relative"
      >
        <h2 class="w-full md:w-[110%] mt-4 mb-2 font-bold text-4xl md:text-7xl text-transparent opacity-15 text-stroke-neutral-500 text-stroke-2 md:-translate-x-16">
          {{ year }}
        </h2>
        <div class="space-y-4">
          <TalkCard
            v-for="talk in yearTalks"
            :key="talk.id"
            :title="talk.title"
            :date="talk.date"
            :venue="talk.venue"
            :description="talk.description"
            :icon="talk.icon"
            :lang="talk.lang"
            :slides="talk.slides ?? undefined"
          >
            <template
              v-if="talk.tags?.length || talk.upcoming"
              #tags
            >
              <div class="flex flex-wrap gap-1.5">
                <UBadge
                  v-for="tag in talk.tags"
                  :key="tag"
                  color="neutral"
                  variant="outline"
                  size="xs"
                >
                  {{ tag }}
                </UBadge>
              </div>
              <UBadge
                v-if="talk.upcoming"
                color="blue"
                variant="soft"
                size="sm"
                icon="i-ph-hourglass-duotone"
              >
                Upcoming
              </UBadge>
            </template>
          </TalkCard>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2 mx-auto mt-8 px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 w-fit transition-opacity hover:opacity-100 opacity-70">
      <UIcon
        name="i-ph-envelope-duotone"
        class="w-5 h-5 text-primary-500"
      />
      <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">
        Interested in having me present? Reach out via the contact dropdown.
      </p>
    </div>
  </main>
</template>
