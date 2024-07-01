<script setup lang="ts">
const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')
watch(isDark, () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})

const config = useRuntimeConfig()
const navs = [
  {
    label: 'home',
    to: '/',
    icon: 'i-ph-house-line-duotone',
    shortcut: 'h'
  },
  {
    label: 'uses',
    to: '/uses',
    icon: 'i-ph-backpack-duotone',
    shortcut: 'u'
  },
  {
    label: 'writings',
    to: '/writings',
    icon: 'i-ph-books-duotone',
    shortcut: 'w'
  },
  {
    label: 'resume',
    to: config.public.cloud.resume,
    target: '_blank',
    icon: 'i-ph-address-book-duotone',
    shortcut: 'r'
  }
]

async function toggleTheme() {
  document.body.style.animation = 'theme-switch-on .5s'
  await new Promise(resolve => setTimeout(resolve, 500))

  isDark.value = !isDark.value
  document.body.style.animation = 'theme-switch-off .5s'

  await new Promise(resolve => setTimeout(resolve, 500))
  document.body.style.animation = ''
}

const router = useRouter()
defineShortcuts({
  h: () => router.push('/'),
  u: () => router.push('/uses'),
  w: () => router.push('/writings'),
  r: () => window.open(config.public.cloud.resume, '_blank'),
  t: () => toggleTheme()
})
</script>

<template>
  <header class="flex items-center justify-between my-8">
    <NuxtLink
      class="handwriting text-lg sm:text-3xl flex gap-2 font-bold duration-300 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
      to="/"
    >
      Arthur Danjou
    </NuxtLink>
    <nav class="flex gap-2 items-center">
      <UTooltip
        v-for="nav in navs"
        :key="nav.label"
        :text="nav.label"
        :shortcuts="[nav.shortcut]"
      >
        <UButton
          :icon="nav.icon"
          :target="nav.target ? nav.target : '_self'"
          :to="nav.to"
          :aria-label="nav.label"
          color="white"
          size="sm"
          label=""
          variant="solid"
        />
      </UTooltip>
      <ClientOnly>
        <UTooltip
          :shortcuts="['t']"
          text="switch theme"
        >
          <UButton
            :icon="isDark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
            color="white"
            aria-label="switch theme"
            size="sm"
            variant="solid"
            @click="toggleTheme()"
          />
        </UTooltip>
      </ClientOnly>
    </nav>
  </header>
</template>

<style>
.handwriting {
  font-family: 'Dancing Script', cursive;
}

@keyframes theme-switch-on {
  0% {
    filter: blur(0);
    transform: scale(1);
  }
  100% {
    transform: scale(0.98);
    filter: blur(3px);
  }
}

@keyframes theme-switch-off {
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
