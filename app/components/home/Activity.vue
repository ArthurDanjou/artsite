<script lang="ts" setup>
import type { UseTimeAgoMessages } from '@vueuse/core'
import type { Activity } from '~~/types'
import { activityMessages, IDEs } from '~~/types'

const { t } = useI18n({
  useScope: 'local',
})

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch<Activity>('/api/activity'))

useIntervalFn(async () => await refresh(), 5000)
const codingActivity = computed(() => {
  const activities = activity.value!.data.activities.filter(activity => IDEs.some(ide => ide.name === activity.name)).map(activity => ({
    ...activity,
    name: activity.assets?.small_text === 'Cursor' ? 'Cursor' : activity.name,
  }))

  return activities.length > 1
    ? activities[Math.floor(Math.random() * activities.length)]
    : activities[0]
})

const { locale, locales } = useI18n()
const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))

const isActive = computed(() => {
  if (!codingActivity.value)
    return

  const { name, details, state } = codingActivity.value

  return name === 'Visual Studio Code' || name === 'Cursor'
    ? !details.includes('Idling')
    : state.toLowerCase().includes('editing')
})

const getActivity = computed(() => {
  if (!codingActivity.value)
    return

  const { name, details, state, timestamps } = codingActivity.value

  const project = details
    ? details
      .charAt(0)
      .toUpperCase()
      + details
        .slice(1)
        .replace('Workspace:', '')
        .trim()
    : ''

  const stateWord = state && state.split(' ').length >= 2 ? state.split(' ')[1] : t('secret')
  const ago = useTimeAgo(timestamps.start, {
    messages: activityMessages[locale.value] as UseTimeAgoMessages,
  }).value
  const formatDate = (date: number, format: string) => useDateFormat(date, format, { locales: currentLocale.value?.code ?? 'en' }).value

  return {
    name,
    project,
    state: stateWord,
    start: {
      ago,
      formated: {
        date: formatDate(timestamps.start, 'DD MMM YYYY'),
        time: formatDate(timestamps.start, 'HH:mm'),
      },
    },
  }
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="getActivity"
      class="flex items-start gap-2"
    >
      <UTooltip :text="isActive ? t('tooltip.online') : t('tooltip.idling')">
        <div class="relative flex h-3 w-3 mt-2">
          <div
            v-if="isActive"
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
          />
          <div
            :class="isActive ? 'bg-green-500' : 'bg-amber-500'"
            class="relative inline-flex rounded-full h-3 w-3"
          />
        </div>
      </UTooltip>
      <i18n-t
        v-if="isActive"
        keypath="working"
        tag="div"
      >
        <template #state>
          <strong>{{ getActivity.state!.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') }}</strong>
        </template>
        <template #project>
          <i>{{ getActivity.project.replaceAll('Editing', '') }}</i>
        </template>
        <template #editor>
          <span class="space-x-1">
            <UIcon
              :name="IDEs.find(ide => ide.name === getActivity!.name)!.icon"
              size="16"
            />
            <strong>{{ getActivity.name }}</strong></span>
        </template>
        <template #start>
          <strong>{{ getActivity.start.ago }}</strong>
        </template>
        <template #format>
          <strong>{{ getActivity.start.formated.date }}</strong> {{ t('separator') }}
          <strong>{{ getActivity.start.formated.time }}</strong>
        </template>
      </i18n-t>
      <i18n-t
        v-else
        keypath="idling"
        tag="div"
        class="space-x-1"
      >
        <template #editor>
          <span class="space-x-1">
            <UIcon
              :name="IDEs.find(ide => ide.name === getActivity!.name)!.icon"
              size="16"
            />
            <strong>{{ getActivity.name }}</strong>
          </span>
        </template>
      </i18n-t>
    </div>
    <div
      v-else
      class="my-5 flex md:items-start gap-2"
    >
      <UTooltip :text="t('tooltip.offline')">
        <div class="relative flex h-3 w-3 mt-2">
          <div
            class="relative cursor-not-allowed inline-flex rounded-full h-3 w-3 bg-red-500"
          />
        </div>
      </UTooltip>
      <i18n-t
        keypath="offline"
        tag="p"
        class="not-prose"
      >
        <template #maths>
          <i>{{ t('maths') }}</i>
        </template>
      </i18n-t>
    </div>
  </ClientOnly>
</template>

<i18n lang="json">
{
  "en": {
    "offline": "I'm currently offline. Come back later to see what I'm working on. {maths}",
    "working": "I'm actually working on {state}, editing {project}, using {editor}. I've started {start}, the {format}.",
    "idling": "I'm idling on my computer with {editor} running in background.",
    "maths": "I am probably doing some maths or sleeping.",
    "tooltip": {
      "online": "I'm online 👋",
      "offline": "I'm offline 🫥",
      "idling": "I'm sleeping 😴"
    },
    "separator": "at",
    "secret": "Secret Project"
  },
  "fr": {
    "offline": "Je suis actuellement hors ligne. Revenez plus tard pour voir sur quoi je travaille. {maths}",
    "working": "Je travaille actuellement sur {state}, éditant {project}, en utilisant {editor}. J'ai commencé {start}, le {format}.",
    "idling": "Je suis en veille sur mon ordinateur avec {editor} en arrière-plan.",
    "maths": "Je suis probablement en train de faire des maths ou en train de dormir.",
    "tooltip": {
      "online": "Je suis connecté 👋",
      "offline": "Je suis déconnecté 🫥",
      "idling": "Je dors 😴"
    },
    "separator": "à",
    "secret": "Projet Secret"
  },
  "es": {
    "offline": "Ahora mismo estoy desconectado. Vuelve más tarde para ver en lo que estoy trabajando. {maths}",
    "working": "Estoy trabajando en {state}, editando {project}, y utilizando {editor}. He empezado {start}, el {format}.",
    "idling": "Estoy en reposo en mi ordenador con {editor} en segundo plano.",
    "maths": "Estoy probablemente haciendo matemáticas o durmiendo.",
    "tooltip": {
      "online": "Estoy conectado 👋",
      "offline": "Estoy desconectado 🫥",
      "idling": "Estoy durmiendo 😴"
    },
    "separator": "a",
    "secret": "Proyecto Secreto"
  }
}
</i18n>
