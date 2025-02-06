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
  },
  {
    label: {
      en: 'uses',
      fr: 'usages',
      es: 'usos',
    },
    to: '/uses',
    icon: 'backpack-duotone',
  },
  {
    label: {
      en: 'portfolio',
      fr: 'portfolio',
      es: 'escritos',
    },
    to: '/portfolio',
    icon: 'books-duotone',
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

const { locale, setLocale, locales, t } = useI18n()
const currentLocale = computed(() => locales.value.filter(l => l.code === locale.value)[0])
const lang = ref(locale.value)
watch(lang, () => changeLocale(lang.value))

async function changeLocale(newLocale: string) {
  document.body.style.animation = 'switch-on .2s'
  await new Promise(resolve => setTimeout(resolve, 200))

  await setLocale(newLocale as 'en' | 'fr' | 'es')
  document.body.style.animation = 'switch-off .2s'

  await new Promise(resolve => setTimeout(resolve, 200))
  document.body.style.animation = ''
}

const openSelectMenu = ref(false)
const openContactDrawer = ref(false)
const router = useRouter()
defineShortcuts({
  t: () => toggleTheme(),
  l: () => openSelectMenu.value = !openSelectMenu.value,
  c: () => openContactDrawer.value = !openContactDrawer.value,
  backspace: () => router.back(),
})
</script>

<template>
  <header class="flex md:items-center justify-between my-8 gap-2">
    <NuxtLinkLocale
      class="handwriting text-xl sm:text-3xl text-nowrap gap-2 font-bold duration-300 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
      to="/"
    >
      Arthur Danjou
    </NuxtLinkLocale>
    <nav class="flex gap-2 items-center justify-end flex-wrap">
      <UTooltip
        v-for="nav in navs"
        :key="nav.label.en"
        :text="nav.label[locale]"
        :delay-duration="4"
      >
        <UButton
          :icon="`i-ph:${nav.icon}`"
          :target="nav.target ? nav.target : '_self'"
          :to="nav.to"
          :aria-label="nav.label"
          color="neutral"
          size="sm"
          variant="ghost"
        />
      </UTooltip>
      <USeparator orientation="vertical" class="h-6" />

      <UDrawer
        v-model:open="openContactDrawer"
        should-scale-background
        :title="t('contact.title')"
      >
        <UTooltip
          :kbds="['C']"
          :text="t('contact.button')"
          :delay-duration="4"
          class="cursor-pointer"
        >
          <UButton
            icon="i-ph-mailbox-duotone"
            color="neutral"
            size="sm"
            variant="ghost"
            @click="openContactDrawer = true"
          />
        </UTooltip>

        <template #body>
          <div>Hey</div>
        </template>
      </UDrawer>
      <USeparator orientation="vertical" class="h-6" />
      <ClientOnly>
        <UTooltip
          :kbds="['T']"
          :text="t('theme')"
          class="cursor-pointer"
          :delay-duration="4"
        >
          <UButton
            :icon="isDark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
            color="neutral"
            aria-label="switch theme"
            size="sm"
            variant="ghost"
            @click="toggleTheme()"
          />
        </UTooltip>
        <UTooltip
          :kbds="['L']"
          :text="t('language')"
          class="cursor-pointer"
          :content="{
            align: 'center',
            side: 'right',
            sideOffset: 8,
          }"
        >
          <USelect
            v-model="lang"
            v-model:open="openSelectMenu"
            :items="locales"
            size="sm"
            :leading-icon="currentLocale.icon"
            label-key="label"
            value-key="code"
            variant="soft"
            @update:model-value="changeLocale"
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
    "language": "change language",
    "contact": {
      "button": "contact me",
      "title": "Contact me"
    }
  },
  "fr": {
    "theme": "changer de thème",
    "language": "changer de langue",
    "contact": {
      "button": "me contacter",
      "title": "Me contacter"
    }
  },
  "es": {
    "theme": "cambiar tema",
    "language": "cambiar idioma",
    "contact": {
       "button": "contactame",
       "title": "Contactame"
     }
  }
}
</i18n>
