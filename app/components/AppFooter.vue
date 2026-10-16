<script setup lang="ts">
import { navs } from '~~/types'

const { contact } = await useContent()

const socials = computed(() => contact?.body
  .filter(item => item.priority === 1)
  .filter(item => item.id !== 'email'))
const email = computed(() => contact?.body.find(item => item.id === 'email'))
const statusPage = computed(() => contact?.body.find(item => item.id === 'status-page'))

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    v-if="contact?.body?.length"
    class="relative my-16"
  >
    <USeparator class="mb-8" />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.1fr_0.8fr_1.1fr] gap-8">
      <div class="space-y-3 sm:col-span-2 md:col-span-1">
        <NuxtLink
          class="flex items-center gap-3 w-fit text-base font-semibold text-highlighted"
          to="/"
          aria-label="Arthur Danjou - home"
        >
          <UAvatar
            src="/arthur.webp"
            alt="Arthur Danjou"
            size="xl"
            class="ring-2 ring-primary-500/20 dark:ring-primary-400/20 shadow-sm"
          />
          <span class="space-y-1">
            <span class="block">Arthur Danjou</span>
            <span class="block text-xs font-normal text-muted">PhD Student in AI Safety</span>
            <span class="block text-xs font-normal text-muted">CMAP, École Polytechnique</span>
          </span>
        </NuxtLink>
        <p
          class="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400"
        >
          Robust learning research and open-source engineering.
        </p>
      </div>

      <div class="space-y-3">
        <h2
          id="footer-navigation-title"
          class="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
        >
          Navigate
        </h2>
        <nav
          aria-labelledby="footer-navigation-title"
          class="grid grid-cols-2 gap-x-4 gap-y-2"
        >
          <NuxtLink
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.to"
            :target="nav.target ? nav.target : '_self'"
            class="w-fit text-sm capitalize text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {{ nav.label }}
          </NuxtLink>
          <NuxtLink
            v-if="statusPage"
            :to="statusPage.value"
            target="_blank"
            class="w-fit text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Status
          </NuxtLink>
        </nav>
      </div>

      <div class="space-y-3">
        <h2
          class="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
        >
          Connect
        </h2>
        <NuxtLink
          v-if="email"
          :to="email.value"
          target="_blank"
          class="flex items-center gap-2 w-fit text-sm font-medium text-toned hover:text-highlighted transition-colors"
        >
          <UIcon
            :name="email.icon"
            class="size-4 shrink-0"
          />
          <span class="break-all">contact@arthurdanjou.fr</span>
        </NuxtLink>
        <div class="-ml-1.5 flex gap-1 flex-wrap">
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
      </div>
    </div>

    <div
      class="mt-8 pt-5 border-t border-default flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-xs text-neutral-500 dark:text-neutral-400"
    >
      <p>
        © {{ currentYear }} Arthur Danjou. All rights reserved.
      </p>
      <NuxtLink
        to="/projects/artsite"
        class="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
      >
        Built with Nuxt, deployed on Cloudflare
      </NuxtLink>
    </div>
  </footer>
</template>
