<script lang="ts" setup>
import { type Activity, IDEs } from '~~/types'

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'))
const codingActivity = computed(() => activity.value!.data.activities.filter(activity => IDEs.some(ide => ide.name === activity.name))[0])

function formatDate(date: number) {
  return `${useDateFormat(date, 'DD MMM YYYY').value} at ${useDateFormat(date, 'HH:mm:ss').value}`
}

useIntervalFn(async () => await refresh(), 5000)
</script>

<template>
  <p
    v-if="codingActivity"
    class="flex items-start gap-2"
  >
    <UTooltip :text="codingActivity.state.toLowerCase().includes('editing') ? 'I\'m online 👋' : 'I\'m sleeping 😴'">
      <div class="relative flex h-3 w-3 mt-2">
        <div
          v-if="codingActivity.state.toLowerCase().includes('editing')"
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
        />
        <div
          :class="codingActivity.state.toLowerCase().includes('editing') ? 'bg-green-500' : 'bg-amber-500'"
          class="relative inline-flex rounded-full h-3 w-3"
        />
      </div>
    </UTooltip>
    <span v-if="codingActivity.state.toLowerCase().includes('editing')">
      I'm actually working on <strong>{{ codingActivity.details }}</strong>,
      {{ codingActivity.state.charAt(0).toLowerCase() + codingActivity.state.slice(1) }}.
      using <strong>{{ codingActivity.name }}</strong>.
      I've started <strong>{{ useTimeAgo(codingActivity.timestamps.start).value }}</strong>, the
      <strong>{{ formatDate(codingActivity.timestamps.start) }}</strong>.
    </span>
    <span v-else>
      I'm Idling on my computer with <strong>{{ codingActivity.name }}</strong> running in background.
    </span>
  </p>
  <p
    v-else
    class="flex md:items-start gap-2"
  >
    <UTooltip text="I'm offline 🫥">
      <div class="cursor-not-allowed h-3 w-3 inline-flex rounded-full bg-red-500 mt-2" />
    </UTooltip>
    <span>
      I'm currently offline. Come back later to see what I'm working on.
    </span>
  </p>
</template>
