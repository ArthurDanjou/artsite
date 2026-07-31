<script setup lang="ts">
import { navs } from '~~/types'

const { contact } = await useContent()

const socials = computed(() => contact?.body
  .filter(item => item.priority === 1)
  .filter(item => item.id !== 'email'))
const email = computed(() => contact?.body.find(item => item.id === 'email'))
const statusPage = computed(() => contact?.body.find(item => item.id === 'status-page'))
</script>

<template>
  <footer v-if="contact?.body?.length" class="relative my-16">
    <div class="flex justify-center mb-12">
      <USeparator class="md:w-2/3" size="xs" type="solid" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
      <div class="space-y-3">
        <NuxtLink
          class="handwriting text-2xl font-bold duration-300 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          to="/"
        >
          Arthur Danjou
        </NuxtLink>
        <p
          class="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400"
        >
          Research in AI Safety and mathematical robustness. Building
          open-source tools and self-hosted infrastructure.
        </p>
        <NuxtLink
          v-if="statusPage"
          :to="statusPage.value"
          target="_blank"
          class="flex items-center gap-2 w-fit text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            />
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            />
          </span>
          All systems operational
        </NuxtLink>
      </div>

      <div class="space-y-3">
        <h2
          class="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
        >
          Navigate
        </h2>
        <nav class="flex flex-col gap-2">
          <NuxtLink
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.to"
            :target="nav.target ? nav.target : '_self'"
            class="w-fit text-sm capitalize text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {{ nav.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="space-y-3">
        <h2
          class="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
        >
          Connect
        </h2>
        <div class="flex gap-1 flex-wrap">
          <UTooltip
            v-for="social in socials"
            :key="social.id"
            :text="social.name"
            :delay-duration="4"
          >
            <UButton
              :icon="social.icon"
              :href="social.value"
              :aria-label="social.name"
              target="_blank"
              color="neutral"
              size="sm"
              variant="ghost"
            />
          </UTooltip>
        </div>
        <div class="ml-1">
          <HomeLink
            v-if="email"
            blanked
            :href="email.value"
            :icon="email.icon"
            label="contact@arthurdanjou.fr"
          />
        </div>
      </div>
    </div>

    <div
      class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400"
    >
      <p>
        © {{ new Date().getFullYear() }} Arthur Danjou. All rights reserved.
      </p>
      <NuxtLink
        to="/projects/artsite"
        class="hidden sm:inline hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
      >
        Built with Nuxt, deployed on Cloudflare
      </NuxtLink>
    </div>
  </footer>
</template>
