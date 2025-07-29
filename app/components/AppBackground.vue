<script lang="ts" setup>
import { navColors } from '~~/types'

const route = useRoute()
const colorMode = useColorMode()

const backgroundStyle = computed(() => {
  const colors = navColors.find(nav => nav.label === route.path)!.colors
  const fallback = colorMode.value === 'dark' ? '#000000' : '#ffffff'

  const currentColors = colors || [fallback, fallback]

  return {
    colorOne: currentColors[0],
    colorTwo: currentColors[1],
    backgroundImage: `
    radial-gradient(circle 500px at ${colorOne.x}% ${colorOne.y}%, ${colorOne.color}4D, transparent),
    radial-gradient(circle 500px at ${colorTwo.x}% ${colorTwo.y}%, ${colorTwo.color}4D, transparent)
  `,
    backgroundSize: '100% 100%',
  }
})
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen w-full absolute inset-0">
      <div class="absolute inset-0 z-0" :style="backgroundStyle" />
    </div>
  </ClientOnly>
</template>
