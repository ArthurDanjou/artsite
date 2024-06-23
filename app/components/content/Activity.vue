<script lang="ts" setup>
import { type Activity, type CodingActivity, IDEs } from '~~/types'

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'))
useIntervalFn(async () => await refresh(), 5000)
const codingActivity = computed(() => activity.value!.data.activities.filter(activity => IDEs.some(ide => ide.name === activity.name))[0])

// eslint-disable-next-line vue/return-in-computed-property
const getActivity = computed<CodingActivity | undefined>(() => {
  const activity = codingActivity.value
  if (!activity) return
  switch (activity.name) {
    case 'Visual Studio Code':
      return {
        active: !activity.details.includes('Idling'),
        name: activity.name,
        project: activity.state ? activity.state.replace('Workspace:', '') : '',
        state: activity.details.charAt(0).toLowerCase() + activity.details.slice(1),
        start: {
          ago: useTimeAgo(activity.timestamps.start).value,
          formated: `${useDateFormat(activity.timestamps.start, 'DD MMM YYYY').value} at ${useDateFormat(activity.timestamps.start, 'HH:mm:ss').value}`
        }
      }
    case 'WebStorm':
    case 'IntelliJ IDEA Ultimate':
      return {
        active: activity.state.toLowerCase().includes('editing'),
        project: activity.details,
        state: activity.state.charAt(0).toLowerCase() + activity.state.slice(1),
        name: activity.name,
        start: {
          ago: useTimeAgo(activity.timestamps.start).value,
          formated: `${useDateFormat(activity.timestamps.start, 'DD MMM YYYY').value} at ${useDateFormat(activity.timestamps.start, 'HH:mm:ss').value}`
        }
      }
  }
})
</script>

<template>
  <div
    v-if="getActivity"
    class="flex items-start gap-2"
  >
    <UTooltip :text="getActivity.active ? 'I\'m online 👋' : 'I\'m sleeping 😴'">
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
    <span
      v-if="getActivity.active"
      class="space-x-1"
    >
      <span>I'm actually working on <strong>{{ getActivity.project }}</strong>, {{ getActivity.state }}, using</span>
      <UIcon
        :name="IDEs.find(ide => ide.name === getActivity!.name)!.icon"
        size="16"
      />
      <span>
        <strong>{{ getActivity.name }}</strong>.
        I've started <strong>{{ getActivity.start.ago }}</strong>, the <strong>{{ getActivity.start.formated }}</strong>.
      </span>
    </span>
    <div
      v-else
      class="space-x-1"
    >
      <span>I'm Idling on my computer with</span>
      <UIcon
        :name="IDEs.find(ide => ide.name === getActivity!.name)!.icon"
        size="16"
      />
      <span>
        <strong>{{ getActivity.name }}</strong> running in background.
      </span>
    </div>
  </div>
  <div
    v-else
    class="my-5 flex md:items-start gap-2"
  >
    <UTooltip text="I'm offline 🫥">
      <span class="cursor-not-allowed h-3 w-3 inline-flex rounded-full bg-red-500 mt-2" />
    </UTooltip>
    <p class="not-prose">
      I'm currently offline. Come back later to see what I'm working on.
    </p>
  </div>
</template>
