<script setup lang="ts">
const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')
watch(isDark, () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})

const config = useRuntimeConfig()
const navs = [
  {
    label: {
      en: 'home',
      fr: 'accueil'
    },
    to: '/',
    icon: 'i-ph-house-line-duotone',
    shortcut: {
      en: 'h',
      fr: 'a'
    }
  },
  {
    label: {
      en: 'uses',
      fr: 'usages'
    },
    to: '/uses',
    icon: 'i-ph-backpack-duotone',
    shortcut: {
      en: 'u',
      fr: 'u'
    }
  },
  {
    label: {
      en: 'writings',
      fr: 'écrits'
    },
    to: '/writings',
    icon: 'i-ph-books-duotone',
    shortcut: {
      en: 'w',
      fr: 'e'
    }
  },
  {
    label: {
      en: 'resume',
      fr: 'cv'
    },
    to: config.public.cloud.resume,
    target: '_blank',
    icon: 'i-ph-address-book-duotone',
    shortcut: {
      en: 'r',
      fr: 'c'
    }
  }
]

async function toggleTheme() {
  document.body.style.animation = 'switch-on .5s'
  await new Promise(resolve => setTimeout(resolve, 500))

  isDark.value = !isDark.value
  document.body.style.animation = 'switch-off .5s'

  await new Promise(resolve => setTimeout(resolve, 500))
  document.body.style.animation = ''
}

async function changeLocale() {
  document.body.style.animation = 'switch-on .2s'
  await new Promise(resolve => setTimeout(resolve, 200))

  await setLocale(locale.value === 'en' ? 'fr' : 'en')
  document.body.style.animation = 'switch-off .2s'

  await new Promise(resolve => setTimeout(resolve, 200))
  document.body.style.animation = ''
}

const router = useRouter()
const { locale, setLocale, locales, t } = useI18n()
const currentLocale = computed(() => locales.value.filter(l => l.code === locale.value)[0])
defineShortcuts({
  h: () => router.push('/'),
  a: () => router.push('/'),
  u: () => router.push('/uses'),
  w: () => router.push('/writings'),
  e: () => router.push('/writings'),
  r: () => window.open(config.public.cloud.resume, '_blank'),
  c: () => window.open(config.public.cloud.resume, '_blank'),
  t: () => toggleTheme(),
  l: () => changeLocale(),
  backspace: () => router.back()
})
</script>

<template>
  <header class="flex items-center justify-between my-8">
    <NuxtLinkLocale
      class="handwriting text-lg sm:text-3xl flex gap-2 font-bold duration-300 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
      to="/"
    >
      Arthur Danjou
    </NuxtLinkLocale>
    <nav class="flex gap-2 items-center">
      <UTooltip
        v-for="nav in navs"
        :key="nav.label.en"
        :shortcuts="[nav.shortcut[locale]]"
        :text="nav.label[locale]"
      >
        <UButton
          :icon="nav.icon"
          :target="nav.target ? nav.target : '_self'"
          :to="nav.to"
          :aria-label="nav.label"
          color="white"
          size="sm"
          variant="solid"
        />
      </UTooltip>
      <ClientOnly>
        <UTooltip
          :shortcuts="['t']"
          :text="t('theme')"
        >
          <UButton
            :icon="isDark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
            color="white"
            aria-label="switch theme"
            size="sm"
            variant="solid"
            @click="toggleTheme()"
          />
        </UTooltip>
        <UTooltip
          :shortcuts="['l']"
          :text="t('language')"
        >
          <UButton
            :icon="currentLocale!.icon"
            aria-label="switch language"
            color="white"
            size="sm"
            variant="solid"
            @click.prevent="changeLocale()"
          />
        </UTooltip>
      </ClientOnly>
    </nav>
  </header>
</template>

<style>
.handwriting {
  font-family: 'Dancing Script', cursive;
}

@keyframes switch-on {
  0% {
    filter: blur(0);
    transform: scale(1);
  }
  100% {
    transform: scale(0.98);
    filter: blur(3px);
  }
}

@keyframes switch-off {
  0% {
    transform: scale(0.98);
    filter: blur(3px);
  }
  100% {
    filter: blur(0);
    transform: scale(1);
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "theme": "switch theme",
    "language": "change language"
  },
  "fr": {
    "theme": "changer de thème",
    "language": "changer de langue"
  }
}
</i18n>
