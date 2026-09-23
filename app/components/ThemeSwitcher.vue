<script setup lang="ts">
const colorMode = useColorMode()
const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))
const buttonRef = ref<{ $el?: HTMLElement } | null>(null)

function switchTheme() {
  // Freeze every CSS transition while the theme flips, so the view
  // transition snapshots capture final colors instead of mid-fade ones.
  document.documentElement.classList.add('theme-switching')
  colorMode.preference = nextTheme.value
}

function toggleDark(event?: MouseEvent | { clientX: number, clientY: number }) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Default to the button center (keyboard shortcut), or the actual click point.
  const rect = buttonRef.value?.$el?.getBoundingClientRect()
  const x = event?.clientX ?? (rect ? rect.left + rect.width / 2 : innerWidth / 2)
  const y = event?.clientY ?? (rect ? rect.top + rect.height / 2 : 0)
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
  t: () => toggleDark()
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
        ref="buttonRef"
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
