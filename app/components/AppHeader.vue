<script setup lang="ts">
import { navs, socials } from '~~/types'

const openContactDrawer = ref(false)
const router = useRouter()
defineShortcuts({
  c: () => openContactDrawer.value = !openContactDrawer.value,
  backspace: () => router.back()
})

const socialsList = [
  {
    label: 'Email',
    icon: 'i-ph-envelope-duotone',
    to: 'mailto:arthurdanjou@outlook.fr'
  },
  ...socials
]
</script>

<template>
  <header class="flex md:items-center justify-between my-8 gap-2">
    <NuxtLink
      class="handwriting text-xl sm:text-3xl text-nowrap gap-2 font-bold duration-300 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
      to="/"
    >
      Arthur Danjou
    </NuxtLink>
    <nav class="flex gap-2 items-center justify-end flex-wrap">
      <UTooltip
        v-for="nav in navs"
        :key="nav.label"
        :text="nav.label"
        :delay-duration="4"
      >
        <UButton
          :icon="`i-ph-${nav.icon}`"
          :target="nav.target ? nav.target : '_self'"
          :href="nav.to"
          :aria-label="nav.label"
          color="neutral"
          size="sm"
          variant="ghost"
        />
      </UTooltip>
      <UTooltip
        :delay-duration="4"
        text="Status Page"
      >
        <UButton
          icon="i-ph-warning-duotone"
          target="_blank"
          href="https://status.arthurdanjou.fr"
          color="neutral"
          size="sm"
          variant="ghost"
        />
      </UTooltip>
      <USeparator
        orientation="vertical"
        class="h-6"
      />
      <UDropdownMenu
        v-model:open="openContactDrawer"
        :items="socialsList"
        :content="{
          align: 'center',
          side: 'bottom',
          sideOffset: 8
        }"
      >
        <UTooltip
          :kbds="['C']"
          text="Contact Me"
          :delay-duration="4"
          class="cursor-pointer"
        >
          <UButton
            icon="i-ph-mailbox-duotone"
            color="neutral"
            size="sm"
            variant="ghost"
            @click="openContactDrawer = true"
          />
        </UTooltip>
      </UDropdownMenu>
    </nav>
  </header>
</template>

<style>
.handwriting {
  font-family: 'Dancing Script', cursive;
}

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
