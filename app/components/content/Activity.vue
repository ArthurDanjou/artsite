<script lang="ts" setup>
import { type Activity, IDEs } from '~~/types'

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'))
useIntervalFn(async () => await refresh(), 5000)
const codingActivity = computed(() => activity.value!.data.activities.find(activity => IDEs.some(ide => ide.name === activity.name)))

const { locale, locales } = useI18n()
const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))

const getActivity = computed(() => {
  if (!codingActivity.value)
    return

  const { name, details, state, timestamps } = codingActivity.value
  const isActive = name === 'Visual Studio Code'
    ? !details.includes('Idling')
    : state.toLowerCase().includes('editing')
  const project = details
    ? details
      .charAt(0)
      .toUpperCase()
      + details
        .slice(1)
        .replace('Workspace:', '')
        .trim()
    : ''
  const stateWord = state.split(' ')[1]
  const timeAgo = useTimeAgo(timestamps.start).value
  const formatDate = (date: number, format: string) => useDateFormat(date, format, { locales: currentLocale.value?.code ?? 'en' }).value

  return {
    active: isActive,
    name,
    project,
    state: stateWord,
    start: {
      ago: locale.value === 'en'
        ? timeAgo
        : timeAgo
          .replace('ago', '')
          .replace('hours', 'heures')
          .replace('minutes', 'minutes')
          .replace('seconds', 'secondes')
          .trim(),
      formated: {
        date: formatDate(timestamps.start, 'DD MMM YYYY'),
        time: formatDate(timestamps.start, 'HH:mm:ss'),
      },
    },
  }
})

const { t } = useI18n({
  useScope: 'local',
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="getActivity"
      class="flex items-start gap-2"
    >
      <UTooltip :text="getActivity.active ? t('tooltip.online') : t('tooltip.idling')">
        <div class="relative flex h-3 w-3 mt-2">
          <div
            v-if="getActivity.active"
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
          />
          <div
            :class="getActivity.active ? 'bg-green-500' : 'bg-amber-500'"
            class="relative inline-flex rounded-full h-3 w-3"
          />
        </div>
      </UTooltip>
      <i18n-t
        v-if="getActivity.active"
        keypath="working"
        tag="div"
      >
        <template #project>
          <strong>{{ getActivity.project }}</strong>
        </template>
        <template #state>
          {{ getActivity.state }}
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
          <UIcon
            :name="IDEs.find(ide => ide.name === getActivity!.name)!.icon"
            size="16"
          />
          <strong>{{ getActivity.name }}</strong>
        </template>
      </i18n-t>
    </div>
    <div
      v-else
      class="my-5 flex md:items-start gap-2"
    >
      <UTooltip :text="t('tooltip.offline')">
        <span class="cursor-not-allowed h-3 w-3 inline-flex rounded-full bg-red-500 mt-2" />
      </UTooltip>
      <p class="not-prose">
        {{ t('offline') }}
      </p>
    </div>
  </ClientOnly>
</template>

<i18n lang="json">
{
  "en": {
    "offline": "I'm currently offline. Come back later to see what I'm working on.",
    "working": "I'm actually working on {project}, editing {state}, using {editor}. I've started {start}, the {format}.",
    "idling": "I'm idling on my computer with {editor} running in background.",
    "tooltip": {
      "online": "I'm online 👋",
      "offline": "I'm offline 🫥",
      "idling": "I'm sleeping 😴"
    },
    "separator": "at"
  },
  "fr": {
    "offline": "Je suis actuellement hors ligne. Revenez plus tard pour voir sur quoi je travaille.",
    "working": "Je travaille actuellement sur {project}, éditant {state}, en utilisant {editor}. J'ai commencé il y a {start}, le {format}.",
    "idling": "Je suis en veille sur mon ordinateur avec {editor} en arrière-plan.",
    "tooltip": {
      "online": "Je suis connecté 👋",
      "offline": "Je suis déconnecté 🫥",
      "idling": "Je dors 😴"
    },
    "separator": "à"
  }
}
</i18n>
