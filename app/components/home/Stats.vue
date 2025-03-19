<script lang="ts" setup>
import type { Stats } from '~~/types'
import { usePrecision } from '@vueuse/math'

const { locale, locales } = useI18n()
const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))

const { data: stats } = await useFetch<Stats>('/api/stats')
console.log(stats.value)
const { t } = useI18n({
  useScope: 'local',
})

</script>

<template>
  <ClientOnly>
    <div>{{ stats }}</div>
  </ClientOnly>
</template>

<i18n lang="json">
{
  "en": {
    "stats": "I collect some data for {time} years, started the {date}. I've coded for a total of {hours} hours. My best editors are {editors}. My best OS is {os}. My top languages are {languages}.",
    "separator": " and ",
    "tooltip": {
      "date": "That was so long ago 🫣",
      "hours": "That's a lot 😮"
    }
  },
  "fr": {
    "stats": "Je collecte des données depuis {time} ans, commencé le {date}. J'ai codé un total de {hours} heures. Mes meilleurs éditeurs sont {editors}. Mon meilleur OS est {os}. Mes langages préférés sont {languages}.",
    "separator": " et ",
    "tooltip": {
      "date": "C'était il y a si longtemps 🫣",
      "hours": "C'est beaucoup 😮"
    }
  },
  "es": {
    "stats": "Recopilo datos desde hace {time} años, empecé el {date}. He programado durante un total de {hours} horas. Mis mejores editores son {editors}. Mi mejor OS es {os}. Y mis lenguajes favoritos son {languages}.",
    "separator": " y ",
    "tooltip": {
      "date": "hace tato tiempo…🫣",
      "hours": "es mucho 😮"
    }
  }
}
</i18n>
