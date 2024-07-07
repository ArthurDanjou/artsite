<script lang="ts" setup>
import { type Activity, IDEs } from '~~/types'

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'))
useIntervalFn(async () => await refresh(), 5000)
const codingActivity = computed(() => activity.value!.data.activities.filter(activity => IDEs.some(ide => ide.name === activity.name))[0])

const { locale, locales } = useI18n()
const currentLocale = computed(() => locales.value.filter(l => l.code === locale.value)[0])

const getActivity = computed(() => {
  const activity = codingActivity.value
  if (!activity) return

  const active = activity.name === 'Visual Studio Code' ? !activity.details.includes('Idling') : activity.state.toLowerCase().includes('editing')
  const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  const project = activity.details ? capitalise(activity.details.replace('Workspace:', '')) : ''
  const state = activity.state.split(' ')[1]
  const start = {
    ago: useTimeAgo(activity.timestamps.start).value,
    formated: `${useDateFormat(
      activity.timestamps.start,
      'DD MMM YYYY',
      { locales: currentLocale.value!.code ?? 'en' }
    ).value} ${t('separator')}
    ${useDateFormat(activity.timestamps.start, 'HH:mm:ss', { locales: currentLocale.value!.code ?? 'en' }).value}`
  }

  return {
    active,
    name: activity.name,
    project,
    state,
    start
  }
})

const { t } = useI18n({
  useScope: 'local'
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
        class="space-x-1"
      >
        <template #project>
          <strong>{{ getActivity.project }}</strong>
        </template>
        <template #state>
          {{ getActivity.state }}
        </template>
        <template #editor>
          <UIcon
            :name="IDEs.find(ide => ide.name === getActivity!.name)!.icon"
            size="16"
          />
          <strong>{{ getActivity.name }}</strong>
        </template>
        <template #start>
          <strong>{{ getActivity.start.ago }}</strong>
        </template>
        <template #format>
          <strong>{{ getActivity.start.formated }}</strong>
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
