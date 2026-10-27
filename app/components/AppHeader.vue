<script setup lang="ts">
import { navs } from '~~/types'
import { isShortHost, LINKS_SITE_URL } from '~~/shared/links'

const openContactDrawer = shallowRef(false)
const router = useRouter()
const requestUrl = useRequestURL()
const onShortHost = computed(() => isShortHost(requestUrl.hostname))
const homeUrl = computed(() => onShortHost.value ? LINKS_SITE_URL : '/')

function resolveNav(to: string): string {
  if (!onShortHost.value || !to.startsWith('/')) return to
  return `${LINKS_SITE_URL}${to}`
}

defineShortcuts({
  c: () => openContactDrawer.value = !openContactDrawer.value,
  backspace: () => router.back()
})

const { contact } = await useContent()

const portfolioNavs = navs.filter(nav => nav.to !== '/links' && nav.label !== 'resume')
const linksNav = navs.find(nav => nav.to === '/links')
const resumeNav = navs.find(nav => nav.label === 'resume')

const contactItems = computed(() => contact?.body
  .filter(item => item.priority === 1)
  .map(item => ({
    label: item.name,
    icon: item.icon,
    href: item.value,
    target: '_blank'
  })) ?? [])
</script>

<template>
  <header class="flex md:items-center justify-between my-8 gap-2">
    <NuxtLink
      class="text-xl sm:text-3xl gap-2 font-bold duration-300 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
      :to="homeUrl"
      aria-label="Arthur Danjou - home"
    >
      <AppSignature animated />
    </NuxtLink>
    <nav class="flex gap-1 items-center justify-end flex-wrap">
      <UTooltip
        v-for="nav in portfolioNavs"
        :key="nav.label"
        :text="nav.label"
        :delay-duration="4"
      >
        <UButton
          :icon="nav.icon"
          :target="nav.target ? nav.target : '_self'"
          :href="resolveNav(nav.to)"
          :aria-label="nav.label"
          color="neutral"
          size="sm"
          variant="ghost"
        />
      </UTooltip>

      <USeparator
        orientation="vertical"
        class="h-6"
      />

      <UTooltip
        v-if="linksNav"
        :text="linksNav.label"
        :delay-duration="4"
      >
        <UButton
          :icon="linksNav.icon"
          :href="resolveNav(linksNav.to)"
          :aria-label="linksNav.label"
          color="neutral"
          size="sm"
          variant="ghost"
        />
      </UTooltip>

      <UTooltip
        :delay-duration="4"
        text="status page"
      >
        <UButton
          icon="i-ph-warning-duotone"
          target="_blank"
          href="https://status.arthurdanjou.fr"
          aria-label="status page"
          color="neutral"
          size="sm"
          variant="ghost"
        />
      </UTooltip>

      <UTooltip
        v-if="resumeNav"
        :text="resumeNav.label"
        :delay-duration="4"
      >
        <UButton
          :icon="resumeNav.icon"
          :target="resumeNav.target ? resumeNav.target : '_self'"
          :href="resolveNav(resumeNav.to)"
          :aria-label="resumeNav.label"
          color="neutral"
          size="sm"
          variant="ghost"
        />
      </UTooltip>

      <ClientOnly>
        <UDropdownMenu
          v-if="contact"
          v-model:open="openContactDrawer"
          :items="contactItems"
          :content="{
            align: 'center',
            side: 'bottom',
            sideOffset: 8
          }"
        >
          <UTooltip
            :kbds="['C']"
            text="contact me"
            :delay-duration="4"
            class="cursor-pointer"
          >
            <UButton
              icon="i-ph-mailbox-duotone"
              color="neutral"
              size="sm"
              variant="ghost"
              aria-label="contact me"
              @click="openContactDrawer = true"
            />
          </UTooltip>
        </UDropdownMenu>
        <template #fallback>
          <UTooltip
            :kbds="['C']"
            text="contact me"
            :delay-duration="4"
          >
            <UButton
              icon="i-ph-mailbox-duotone"
              color="neutral"
              size="sm"
              variant="ghost"
              aria-label="contact me"
            />
          </UTooltip>
        </template>
      </ClientOnly>

      <USeparator
        orientation="vertical"
        class="h-6"
      />

      <ThemeSwitcher />
    </nav>
  </header>
</template>

<style>
/* .handwriting lives in assets/css/main.css (shared with AppFooter) */
@keyframes switch-on {
  0% {
    filter: blur(0);
    transform: scale(1);
  }
  100% {
    transform: scale(0.98);
    filter: blur(3px);
  }
}

@keyframes switch-off {
  0% {
    transform: scale(0.98);
    filter: blur(3px);
  }
  100% {
    filter: blur(0);
    transform: scale(1);
  }
}
</style>
