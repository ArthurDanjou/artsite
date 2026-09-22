<script lang="ts" setup>
const { data: page } = await useAsyncData('publish', () => {
  return queryCollection('publish').first()
})

const { publications, talks } = await useContent()

const title = page.value?.title ?? 'Publications & Talks'
const description = page.value?.description ?? 'My publications, including the Krum library paper in preparation at JMLR MLOSS, and my academic talks on Byzantine-resilient aggregation.'

const head = {
  title,
  description,
  headline: 'Arthur Danjou\u2019s Publications & Talks'
}

useSeoMeta({
  title: head.title,
  description: head.description,
  ogTitle: `${head.title} \u2022 Arthur Danjou`,
  ogDescription: head.description
})

defineOgImage('Pergel.satori', {
  title: head.title,
  description: head.description,
  headline: head.headline
})

const sectionHeadingClass = 'w-full mt-4 mb-2 font-bold text-4xl md:text-7xl text-transparent opacity-15 dark:opacity-30 text-stroke-neutral-500 dark:text-stroke-neutral-300 text-stroke-2'

const sortedPublications = computed(() =>
  [...(publications?.body ?? [])].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
)

const displayTalks = computed(() =>
  (talks?.body ?? []).map(talk => ({
    ...talk,
    formattedDate: formatTalkDate(talk.date)
  }))
)

const grouped = computed<Record<string, typeof displayTalks.value>>(() => {
  const groups: Record<string, typeof displayTalks.value> = {}
  ;(displayTalks.value ?? []).forEach((talk) => {
    const yearMatch = talk.date.match(/\d{4}/)
    const key = yearMatch ? yearMatch[0] : 'TBA'
    ;(groups[key] ||= []).push(talk)
  })

  return Object.fromEntries(
    Object.entries(groups).sort(([a], [b]) => {
      const aNum = Number(a)
      const bNum = Number(b)
      const aIsYear = Number.isFinite(aNum)
      const bIsYear = Number.isFinite(bNum)

      if (aIsYear && bIsYear) return bNum - aNum
      if (aIsYear) return -1
      if (bIsYear) return 1
      return a.localeCompare(b)
    })
  )
})
</script>

<template>
  <main>
    <ContentRenderer
      v-if="page"
      :value="page"
      class="mt-8 md:mt-16"
    />

    <section class="mt-12">
      <h2 :class="sectionHeadingClass">
        Publications
      </h2>
      <div
        v-if="publications?.body?.length"
        class="space-y-4"
      >
        <PublishCard
          v-for="pub in sortedPublications"
          :key="pub.id"
          :title="pub.title"
          :description="pub.description"
          :year="pub.year"
          :status="pub.status"
          :authors="pub.authors"
          :tags="pub.tags"
          :links="pub.links"
          :icon="pub.icon"
        />
      </div>
    </section>

    <section class="mt-12">
      <h2 :class="sectionHeadingClass">
        Talks
      </h2>
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        I present my work whenever I get the chance, and slides are linked when available.
      </p>

      <div
        v-if="talks?.body?.length"
        class="space-y-10"
      >
        <div
          v-for="(yearTalks, year) in grouped"
          :key="year"
          class="relative"
        >
          <h3 class="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            {{ year }}
          </h3>
          <div class="space-y-4">
            <TalkCard
              v-for="talk in yearTalks"
              :key="talk.id"
              :title="talk.title"
              :date="talk.formattedDate"
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

      <div class="flex items-center gap-2 mt-8 px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 w-fit transition-opacity hover:opacity-100 opacity-70">
        <UIcon
          name="i-ph-envelope-duotone"
          class="w-5 h-5 text-primary-500"
        />
        <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Interested in having me present? Reach out via the contact dropdown.
        </p>
      </div>
    </section>
  </main>
</template>
