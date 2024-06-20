<script setup lang="ts">
const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')
watch(isDark, () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})

const navs = [
  {
    label: 'home',
    to: '/',
    icon: 'i-ph-house-bold'
  },
  {
    label: 'uses',
    to: '/uses',
    icon: 'i-ph-briefcase-bold'
  },
  {
    label: 'writings',
    to: '/writings',
    icon: 'i-ph-newspaper-bold'
  },
  {
    label: 'resume',
    to: '/resume.pdf',
    target: '_blank',
    icon: 'i-ph-person-arms-spread-bold'
  }
]
</script>

<template>
  <header class="flex justify-between my-8">
    <div>
      Logo
    </div>
    <div class="flex gap-2 items-center">
      <div
        v-for="nav in navs"
        :key="nav.label"
      >
        <UTooltip :text="nav.label">
          <UButton
            :icon="nav.icon"
            :to="nav.to"
            variant="link"
            color="gray"
            size="sm"
            :target="nav.target ? nav.target : '_self'"
            dynamic
          />
        </UTooltip>
      </div>
      <ClientOnly>
        <UTooltip text="switch theme">
          <UButton
            :icon="isDark ? 'i-lucide:moon' : 'i-lucide:sun'"
            variant="link"
            color="gray"
            size="sm"
            @click="isDark = !isDark"
          />
        </UTooltip>
      </ClientOnly>
    </div>
  </header>
</template>
