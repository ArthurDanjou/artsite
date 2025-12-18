<script lang="ts" setup>
const openSelectMenu = ref(false)

const { locale, setLocale, locales, t } = useI18n()
const currentLocale = computed(() => locales.value.filter(l => l.code === locale.value)[0])
const lang = ref(locale.value)
watch(lang, () => changeLocale(lang.value))

async function changeLocale(newLocale: string) {
  document.body.style.animation = 'switch-on .2s'
  await new Promise(resolve => setTimeout(resolve, 200))

  await setLocale(newLocale as 'en' | 'fr' | 'es')
  document.body.style.animation = 'switch-off .5s'

  await new Promise(resolve => setTimeout(resolve, 200))
  document.body.style.animation = ''
}

defineShortcuts({
  l: () => lang.value = currentLocale.value!.code === 'en' ? 'fr' : currentLocale.value!.code === 'fr' ? 'es' : 'en'
})
</script>

<template>
  <ClientOnly>
    <ThemeSwitcher />
    <UTooltip
      :kbds="['L']"
      :text="t('language')"
      class="cursor-pointer"
      :delay-duration="4"
      :content="{
        align: 'center',
        side: 'right',
        sideOffset: 8
      }"
    >
      <USelect
        v-model="lang"
        v-model:open="openSelectMenu"
        :items="locales"
        size="sm"
        :leading-icon="(currentLocale!.icon as string)"
        label-key="label"
        value-key="code"
        variant="soft"
        @update:model-value="changeLocale"
      />
    </UTooltip>
  </ClientOnly>
</template>

<i18n lang="json">
{
  "en": {
    "language": "change language"
  },
  "fr": {
    "language": "changer de langue"
  },
  "es": {
    "language": "cambiar idioma"
  }
}
</i18n>
