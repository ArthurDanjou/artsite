<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()
const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

function switchTheme() {
  colorMode.preference = nextTheme.value
}

function toggleDark(event: MouseEvent | { clientX: number, clientY: number }) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    switchTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    switchTheme()
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: colorMode.value === 'dark'
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: colorMode.value === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}

defineShortcuts({
  t: () => toggleDark({ clientX: window.innerWidth, clientY: 0 }),
})
</script>

<template>
  <UTooltip
    :kbds="['T']"
    :text="t('theme')"
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
</template>

<i18n lang="json">
{
  "en": {
    "theme": "switch theme"
  },
  "fr": {
    "theme": "changer de thème"
  },
  "es": {
    "theme": "cambiar tema"
  }
}
</i18n>
