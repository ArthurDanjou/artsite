<script lang="ts" setup>
import { navColors } from '~~/types'

const route = useRoute()
const colorMode = useColorMode()

const colors = computed(() => {
  const navColor = navColors.find(nav => route.name === nav.name)
  if (navColor?.colors) return navColor.colors
  
  const fallbackColor = colorMode.value === 'dark' ? '#000000' : '#ffffff'
  return [{ color: fallbackColor, x: 0, y: 0 }, { color: fallbackColor, x: 0, y: 0 }]
})

const backgroundStyle = computed(() => ({
  backgroundImage: colors.value
    .map(c => `radial-gradient(circle 500px at ${c.x}% ${c.y}%, ${c.color}4D, transparent)`)
    .join(', ')
}))
</script>

<template>
  <div class="min-h-screen w-full absolute inset-0">
    <div class="absolute inset-0 z-0" :style="backgroundStyle" />
  </div>
</template>
