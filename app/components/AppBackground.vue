<script lang="ts" setup>
import { navColors } from '~~/types'

const route = useRoute()
const colorMode = useColorMode()

const currentColors = computed(() => {
  const colors = navColors.find(nav => route.path.includes(nav.path))!.colors
  const fallback = colorMode.value === 'dark'
    ? {
        color: '#000000',
        x: 0,
        y: 0,
      }
    : {
        color: '#ffffff',
        x: 0,
        y: 0,
      }

  return colors || [fallback, fallback]
})

const backgroundStyle = computed(() => ({
  backgroundImage: `
    radial-gradient(circle 500px at ${currentColors.value[0].x}% ${currentColors.value[0].y}%, ${currentColors.value[0].color}4D, transparent),
    radial-gradient(circle 500px at ${currentColors.value[1].x}% ${currentColors.value[1].y}%, ${currentColors.value[1].color}4D, transparent)
  `,
  backgroundSize: '100% 100%',
}))
</script>

<template>
  <div class="min-h-screen w-full absolute inset-0">
    <div class="absolute inset-0 z-0" :style="backgroundStyle" />
  </div>
</template>
