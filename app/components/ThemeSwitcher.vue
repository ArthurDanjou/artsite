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

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  // Click point and radius as CSS variables so the keyframes can use them.
  document.documentElement.style.setProperty('--reveal-x', `${x}px`)
  document.documentElement.style.setProperty('--reveal-y', `${y}px`)
  document.documentElement.style.setProperty('--reveal-r', `${endRadius}px`)

  if (!isAppearanceTransition) {
    switchTheme()
    setTimeout(() => document.documentElement.classList.remove('theme-switching'), 300)
    return
  }

  const transition = document.startViewTransition(async () => {
    switchTheme()
    await nextTick()
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
/* Global on purpose: view-transition pseudo-elements live outside component scope.
   Scoped to the theme swap (.theme-switching is on <html> for its duration) so
   page navigations keep the native View Transition cross-fade. */
html.theme-switching::view-transition-old(root),
html.theme-switching::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
html.theme-switching::view-transition-old(root) {
  z-index: 1;
}
html.theme-switching::view-transition-new(root) {
  z-index: 9999;
}
html.theme-switching.dark::view-transition-old(root) {
  z-index: 9999;
}
html.theme-switching.dark::view-transition-new(root) {
  z-index: 1;
}

/* Light to dark: the light snapshot shrinks into the click point.
   Keyframes instead of element.animate() so the clip applies from the
   very first painted frame, with no unclipped flash. */
html.theme-switching.dark::view-transition-old(root) {
  animation: reveal-out 400ms ease-out forwards;
}

/* Dark to light: the light layer expands from the click point. */
html.theme-switching:not(.dark)::view-transition-new(root) {
  animation: reveal-in 400ms ease-out forwards;
}

@keyframes reveal-out {
  from {
    clip-path: circle(var(--reveal-r) at var(--reveal-x) var(--reveal-y));
  }
  to {
    clip-path: circle(0px at var(--reveal-x) var(--reveal-y));
  }
}

@keyframes reveal-in {
  from {
    clip-path: circle(0px at var(--reveal-x) var(--reveal-y));
  }
  to {
    clip-path: circle(var(--reveal-r) at var(--reveal-x) var(--reveal-y));
  }
}

/* Kill color fades while the theme flips, inside the view transition too */
html.theme-switching *,
html.theme-switching *::before,
html.theme-switching *::after {
  transition: none !important;
}
</style>
