<script lang="ts" setup>
import { navColors, NavColor } from '~~/types'

const route = useRoute()
const colorMode = useColorMode()

const colors = computed(() => {
  const navColor = navColors.find(nav => route.name === nav.name)
  if (navColor?.colors) return navColor.colors as Array<NavColor>

  const fallbackColor = colorMode.value === 'dark' ? '#000000' : '#ffffff'
  return [{ color: fallbackColor, x: 0, y: 0, radius: 0 }, { color: fallbackColor, x: 0, y: 0, radius: 0 }] as Array<NavColor>
})

const backgroundStyle = computed(() => ({
  backgroundImage: colors.value
    .map(c => `radial-gradient(circle ${c.radius}px at ${c.x}% ${c.y}%, ${c.color}4D, transparent)`)
    .join(', '),
  backgroundSize: '100% 100%, 100% 100%'
}))
</script>

<template>
    <div
      class="fixed  inset-0 z-0"
      :style="backgroundStyle"
    />
</template>
