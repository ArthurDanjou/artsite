<script lang="ts" setup>
import { VISIBLE_PUBLICATION_TAGS } from '~~/types'

const { data: page } = await useAsyncData('publicationsPage', () => {
  return queryCollection('publicationsPage').first()
})

const { publications, talks } = await useContent()

const title = page.value?.title ?? 'Publications & Talks'
const description = page.value?.description ?? 'My publications and talks.'

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

const yearHeadingClass = 'w-full mt-4 mb-2 text-transparent italic text-2xl md:text-4xl text-neutral-600  dark:text-neutral-400 opacity-15 dark:opacity-30 text-stroke-neutral-500 dark:text-stroke-neutral-300 text-stroke-2'

// Anonymous submissions and work in preparation stay in the data file but
// are not published on the site: only explicitly released work is listed.
const visiblePublications = computed(() =>
  (publications?.body ?? []).filter(pub =>
    pub.tags?.some(tag => VISIBLE_PUBLICATION_TAGS.has(tag)) ?? false
  )
)

const groupedPublications = computed(() =>
  groupByYearDesc(visiblePublications.value, pub => pub.year)
)

const displayTalks = computed(() =>
  (talks?.body ?? []).map(talk => ({
    ...talk,
    formattedDate: formatTalkDate(talk.date)
  }))
)

const groupedTalks = computed(() =>
  groupByYearDesc(displayTalks.value, (talk) => {
    const year = talk.date.match(/\d{4}/)?.[0]
    return year ? Number(year) : undefined
  })
)
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
      <p class="text-neutral-600 dark:text-neutral-400 mb-6">
        My research papers and preprints, with code and project pages linked when they exist.
      </p>
      <div
        v-if="visiblePublications.length"
        class="space-y-10"
      >
        <div
          v-for="group in groupedPublications"
          :key="group.year"
        >
          <h3 :class="yearHeadingClass">
            {{ group.year }}
          </h3>
          <div class="space-y-4">
            <PublishCard
              v-for="pub in group.items"
              :key="pub.id"
              :title="pub.title"
              :description="pub.description"
              :status="pub.status"
              :authors="pub.authors"
              :tags="pub.tags"
              :links="pub.links"
              :icon="pub.icon"
            />
          </div>
        </div>
      </div>
      <p
        v-else
        class="text-sm text-neutral-500 italic"
      >
        Accepted papers and preprints will appear here.
      </p>
    </section>

    <section class="mt-12">
      <h2 :class="sectionHeadingClass">
        Talks
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-6">
        I present my work whenever I get the chance, and I link the slides when they exist.
      </p>

      <div
        v-if="talks?.body?.length"
        class="space-y-10"
      >
        <div
          v-for="group in groupedTalks"
          :key="group.year"
          class="relative"
        >
          <h3 :class="yearHeadingClass">
            {{ group.year }}
          </h3>
          <div class="space-y-4">
            <TalkCard
              v-for="talk in group.items"
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
                v-if="talk.tags?.length"
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
