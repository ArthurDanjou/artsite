<script lang="ts" setup>
import type { Activity } from '~~/types'
import { IDEs } from '~~/types'

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'),
  { lazy: true }
)

useIntervalFn(refresh, 1000)

const codingActivities = computed(() => {
  const list = activity.value?.data.activities ?? []
  return list
    .filter(a => IDEs.some(ide => ide.name === a.name))
    .map(a => ({ ...a, name: a.assets?.small_text === 'Cursor' ? 'Cursor' : a.name }))
})

const codingActivity = computed(() => {
  if (!codingActivities.value.length) return null
  return codingActivities.value.length > 1
    ? codingActivities.value[Math.floor(Math.random() * codingActivities.value.length)]
    : codingActivities.value[0]
})

const isActive = computed(() => {
  const act = codingActivity.value
  if (!act) return false

  const { name, details = '', state = '' } = act

  if (name === 'Visual Studio Code' || name === 'Cursor')
    return !details.includes('Idling')

  return state.toLowerCase().includes('editing')
})

type FormattedActivity = {
  name: string
  project: string
  state: string
  start: {
    ago: string
    formatted: { date: string, time: string }
  }
} | null

const formattedActivity = computed<FormattedActivity>(() => {
  const act = codingActivity.value
  if (!act) return null

  const { name, details = '', state = '', timestamps } = act

  const project = details
    ? (details.charAt(0).toUpperCase() + details.slice(1).replace('Workspace:', '').trim())
    : ''

  const stateWord = (state && state.split(' ').length >= 2 ? state.split(' ')[1] : 'Secret project') as string
  const ago = useTimeAgo(timestamps.start).value

  const formatDate = (date: number, format: string) =>
    useDateFormat(date, format).value

  return {
    name,
    project,
    state: stateWord,
    start: {
      ago,
      formatted: {
        date: formatDate(timestamps.start, 'DD MMM YYYY'),
        time: formatDate(timestamps.start, 'HH:mm')
      }
    }
  }
})

const editorIcon = computed(() => {
  const name = formattedActivity.value?.name ?? codingActivity.value?.name
  return IDEs.find(ide => ide.name === name)?.icon ?? 'file'
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="formattedActivity"
      class="flex items-start gap-2 mt-4"
    >
      <UTooltip :text="isActive ? 'I\'m online 👋' : 'I\'m sleeping 😴'">
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

      <div
        v-if="isActive"
        class="space-x-1"
      >
        <span>
          I'm actually working on
          <strong>{{ formattedActivity.state.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') }}</strong>,
          editing <i>{{ formattedActivity.project.replace('Editing', '') }}</i>, using
          <span class="space-x-1">
            <UIcon
              :name="editorIcon"
              size="16"
            />
            <strong>{{ formattedActivity.name }}</strong>
          </span>.
          I've started <strong>{{ formattedActivity.start.ago }}</strong>, on
          <strong>{{ formattedActivity.start.formatted.date }}</strong>
          at <strong>{{ formattedActivity.start.formatted.time }}</strong>.
        </span>
      </div>

      <div
        v-else
        class="space-x-1"
      >
        <span>
          I'm idling on my computer with
          <span class="space-x-1">
            <UIcon
              :name="editorIcon"
              size="16"
            />
            <strong>{{ formattedActivity.name }}</strong>
          </span>
          running in background.
        </span>
      </div>
    </div>

    <div
      v-else
      class="my-5 flex md:items-start gap-2"
    >
      <UTooltip text="I'm offline 🫥">
        <div class="relative flex h-3 w-3 mt-2">
          <div class="relative cursor-not-allowed inline-flex rounded-full h-3 w-3 bg-red-500" />
        </div>
      </UTooltip>
      <p class="not-prose">
        I'm currently offline. Come back later to see what I'm working on. <i>I am probably doing some maths or sleeping.</i>
      </p>
    </div>
  </ClientOnly>
</template>
