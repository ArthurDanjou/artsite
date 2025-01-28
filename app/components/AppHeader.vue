<script setup lang="ts">
const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')
watch(isDark, () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})

const navs = [
  {
    label: {
      en: 'home',
      fr: 'accueil',
      es: 'inicio',
    },
    to: '/',
    icon: 'house-line-duotone',
    shortcut: {
      en: 'H',
      fr: 'A',
      es: 'I',
    },
  },
  {
    label: {
      en: 'uses',
      fr: 'usages',
      es: 'usos',
    },
    to: '/uses',
    icon: 'backpack-duotone',
    shortcut: {
      en: 'U',
      fr: 'U',
      es: 'U',
    },
  },
  {
    label: {
      en: 'portfolio',
      fr: 'portfolio',
      es: 'escritos',
    },
    to: '/portfolio',
    icon: 'books-duotone',
    shortcut: {
      en: 'W',
      fr: 'E',
      es: 'E',
    },
  },
  {
    label: {
      en: 'resume',
      fr: 'cv',
      es: 'currículum',
    },
    icon: 'address-book-duotone',
    to: '/Resume2024.pdf',
    target: '_blank',
    shortcut: {
      en: 'R',
      fr: 'C',
      es: 'C',
    },
  },
]

async function toggleTheme() {
  document.body.style.animation = 'switch-on .5s'
  await new Promise(resolve => setTimeout(resolve, 500))

  isDark.value = !isDark.value
  document.body.style.animation = 'switch-off .5s'

  await new Promise(resolve => setTimeout(resolve, 500))
  document.body.style.animation = ''
}

const { locale, setLocale, locales, t, availableLocales } = useI18n()
const currentLocale = computed(() => locales.value.filter(l => l.code === locale.value)[0])
const lang = ref(locale.value)
watch(lang, () => changeLocale(lang.value))

async function changeLocale(newLocale?: string) {
  document.body.style.animation = 'switch-on .2s'
  await new Promise(resolve => setTimeout(resolve, 200))

  if (!newLocale) {
    const currentLocaleIndex = availableLocales.findIndex(l => l === locale.value)
    const nextLocaleIndex = (currentLocaleIndex + 1) % availableLocales.length
    newLocale = availableLocales[nextLocaleIndex]
    lang.value = newLocale!
  }

  await setLocale(newLocale ?? 'en')
  document.body.style.animation = 'switch-off .2s'

  await new Promise(resolve => setTimeout(resolve, 200))
  document.body.style.animation = ''
}

const router = useRouter()
defineShortcuts({
  t: () => toggleTheme(),
  l: () => changeLocale(),
  backspace: () => router.back(),
})
</script>

<template>
  <header class="flex md:items-center justify-between my-8 gap-2">
    <NuxtLinkLocale
      class="handwriting text-xl sm:text-3xl text-nowrap gap-2 font-bold duration-300 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
      to="/"
    >
      Arthur Danjou
    </NuxtLinkLocale>
    <nav class="flex gap-2 items-center justify-end flex-wrap">
      <UTooltip
        v-for="nav in navs"
        :key="nav.label.en"
        :text="nav.label[locale]"
      >
        <UButton
          :icon="`i-ph:${nav.icon}`"
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
          :shortcuts="['T']"
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
          :shortcuts="['L']"
          :text="t('language')"
          :popper="{ placement: 'right' }"
        >
          <USelectMenu
            v-model="lang"
            :options="locales"
            size="sm"
            option-attribute="code"
            value-attribute="code"
            variant="outline"
          >
            <template #leading>
              <UIcon
                :name="currentLocale!.icon"
                class="w-5 h-5"
              />
            </template>
            <template #option="{ option: language }">
              <UIcon
                :name="language.icon"
                class="w-5 h-5"
              />
              <span>{{ language.code }}</span>
            </template>
          </USelectMenu>
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
  },
  "es": {
    "theme": "cambiar tema",
    "language": "cambiar idioma"
  }
}
</i18n>
