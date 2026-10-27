<script setup lang="ts">
import type { LinksCollectionItem } from '@nuxt/content'
import { groupPublicLinks, isShortHost, LINKS_PAGE_PATH, LINKS_SITE_URL, shortLinkUrl } from '~~/shared/links'

const requestUrl = useRequestURL()
const onShortHost = computed(() => isShortHost(requestUrl.hostname))

const { data } = await useAsyncData('links-page', () => {
  return queryCollection('links').all()
})

const grouped = computed(() => groupPublicLinks(data.value ?? [] as LinksCollectionItem[]))
const groups = computed(() => grouped.value.groups)
const socials = computed(() => grouped.value.socials)

const sectionHeadingClass = 'w-full mt-4 mb-2 font-bold text-4xl md:text-7xl text-transparent opacity-15 dark:opacity-30 text-stroke-neutral-500 dark:text-stroke-neutral-300 text-stroke-2'

const title = 'Links'
const description = 'All my links in one place: research, projects, social profiles, CV, and contact.'

useSeoMeta({
  title,
  description,
  ogTitle: `${title} \u2022 Arthur Danjou`,
  ogDescription: description,
  ogUrl: `${LINKS_SITE_URL}${LINKS_PAGE_PATH}`,
  ...(onShortHost.value ? { robots: 'noindex, follow' } : {})
})

useHead({
  link: [{ rel: 'canonical', href: `${LINKS_SITE_URL}${LINKS_PAGE_PATH}` }]
})

defineOgImage('Pergel.satori', {
  title,
  description,
  headline: 'Arthur Danjou\u2019s Links'
})
</script>

<template>
  <main class="space-y-8 py-4">
    <div class="space-y-4">
      <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
        Links
      </h1>
      <p class="max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">
        {{ description }}
      </p>

      <div
        v-if="socials.length"
        class="-ml-1.5 flex gap-1 flex-wrap"
      >
        <UTooltip
          v-for="social in socials"
          :key="social.slug"
          :text="social.title"
          :delay-duration="4"
        >
          <UButton
            :to="shortLinkUrl(social.slug)"
            :icon="social.icon || 'i-ph-link-duotone'"
            :aria-label="social.title"
            target="_blank"
            color="neutral"
            size="sm"
            variant="ghost"
          />
        </UTooltip>
      </div>
    </div>

    <template v-if="groups.length">
      <section
        v-for="group in groups"
        :key="group.label"
      >
        <h2 :class="sectionHeadingClass">
          {{ group.label }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <LinksLinkCard
            v-for="link in group.links"
            :key="link.slug"
            :link="link"
          />
        </div>
      </section>
    </template>

    <div
      v-else
      class="rounded-lg border border-dashed border-neutral-200 p-10 text-center dark:border-neutral-800"
    >
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        Links are being imported. Check back soon.
      </p>
    </div>

    <section
      aria-labelledby="links-contact-title"
      class="not-prose mt-4 rounded-2xl border border-neutral-200 bg-default p-6 sm:p-8 dark:border-default dark:bg-elevated/30"
    >
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-default text-muted ring-1 ring-default">
          <UIcon
            name="i-ph-chat-circle-dots-duotone"
            class="size-6"
          />
        </div>

        <div class="min-w-0 flex-1 space-y-2">
          <h2
            id="links-contact-title"
            class="text-lg font-semibold text-highlighted"
          >
            Let’s talk
          </h2>
          <p class="max-w-2xl text-sm leading-relaxed text-toned">
            Research collaboration, engineering work, or just a hello. My inbox is always open.
          </p>
        </div>

        <div class="flex flex-wrap gap-2 shrink-0">
          <UButton
            :to="shortLinkUrl('mail-pro')"
            icon="i-ph-envelope-simple-duotone"
            label="Email me"
            size="lg"
            color="neutral"
            variant="soft"
            class="min-h-11 justify-center rounded-md px-5 shrink-0"
            target="_blank"
          />
          <UButton
            :to="shortLinkUrl('call')"
            icon="i-ph-calendar-dots-duotone"
            label="Book a call"
            size="lg"
            color="neutral"
            variant="outline"
            class="min-h-11 justify-center rounded-md px-5 shrink-0"
            target="_blank"
          />
        </div>
      </div>
    </section>
  </main>
</template>
