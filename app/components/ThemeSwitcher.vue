<script setup lang="ts">
const colorMode = useColorMode()
const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

function switchTheme() {
  // Freeze every CSS transition while the theme flips, so the view
  // transition snapshots capture final colors instead of mid-fade ones.
  document.documentElement.classList.add('theme-switching')
  colorMode.preference = nextTheme.value
}

function toggleDark(event: MouseEvent | { clientX: number, clientY: number }) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    switchTheme()
    setTimeout(() => document.documentElement.classList.remove('theme-switching'), 300)
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  const transition = document.startViewTransition(async () => {
    switchTheme()
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]
      document.documentElement.animate(
        {
          clipPath: colorMode.value === 'dark'
            ? [...clipPath].reverse()
            : clipPath
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: colorMode.value === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      )
    })
  transition.finished.finally(() => {
    document.documentElement.classList.remove('theme-switching')
  })
}

defineShortcuts({
  t: () => toggleDark({ clientX: window.innerWidth, clientY: 0 })
})
</script>

<template>
  <ClientOnly>
    <UTooltip
      :kbds="['T']"
      text="switch theme"
      class="cursor-pointer"
      :delay-duration="4"
    >
      <UButton
        :icon="nextTheme === 'dark' ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
        color="neutral"
        aria-label="switch theme"
        size="sm"
        variant="ghost"
        @click="toggleDark"
      />
    </UTooltip>
    <template #fallback>
      <UButton
        icon="i-ph-sun-duotone"
        color="neutral"
        aria-label="switch theme"
        size="sm"
        variant="ghost"
      />
    </template>
  </ClientOnly>
</template>

<style>
/* Global on purpose: view-transition pseudo-elements live outside component scope */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}

/* Kill color fades while the theme flips, inside the view transition too */
html.theme-switching *,
html.theme-switching *::before,
html.theme-switching *::after {
  transition: none !important;
}
</style>
