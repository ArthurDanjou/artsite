<script setup lang="ts">
const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')
watch(isDark, () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})

const { cloud } = useRuntimeConfig()
const navs = [
  {
    label: 'home',
    to: '/',
    icon: 'i-ph-house-line-duotone'
  },
  {
    label: 'uses',
    to: '/uses',
    icon: 'i-ph-briefcase-duotone'
  },
  {
    label: 'writings',
    to: '/writings',
    icon: 'i-ph-newspaper-clipping-duotone'
  },
  {
    label: 'resume',
    to: '',
    target: '_blank',
    icon: 'i-ph-address-book-duotone'
  }
]

function toggleTheme() {
  if (!document.startViewTransition) {
    isDark.value = !isDark.value
    return
  }

  document.startViewTransition(() => {
  })
}
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
      >
        <UButton
          :icon="nav.icon"
          :target="nav.target ? nav.target : '_self'"
          :to="nav.to"
          color="gray"
          dynamic
          size="sm"
          variant="link"
        />
      </UTooltip>
      <ClientOnly>
        <UTooltip text="switch theme">
          <UButton
            :icon="isDark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
            variant="link"
            color="gray"
            size="sm"
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
</style>
