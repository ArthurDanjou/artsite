<script lang="ts" setup>
import { navColors, type NavColor } from '~~/types'

const route = useRoute()
const colorMode = useColorMode()

const colors = computed((): NavColor[] => {
  const navColor = navColors.find(nav => route.name === nav.name)
  if (navColor?.colors) return navColor.colors

  const fallbackColor = colorMode.value === 'dark' ? '#000000' : '#ffffff'
  const fallbackGradient = { color: fallbackColor, x: 0, y: 0, radius: 0 }
  return [fallbackGradient, fallbackGradient]
})

const backgroundStyle = computed(() => {
  const gradients = colors.value
    .map(({ color, radius, x, y }) => 
      `radial-gradient(circle ${radius}px at ${x}% ${y}%, ${color}4D, transparent)`
    )
    .join(', ')
  
  return {
    backgroundImage: gradients,
    backgroundSize: Array(colors.value.length).fill('100% 100%').join(', ')
  }
})
</script>

<template>
  <div
    class="fixed inset-0 z-0 hidden md:block blur-xl"
    :style="backgroundStyle"
  />
</template>
