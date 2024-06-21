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
  <div
    v-if="codingActivity"
    class="flex items-start gap-2"
  >
    <UTooltip :text="codingActivity.state.toLowerCase().includes('editing') ? 'I\'m online 👋' : 'I\'m sleeping 😴'">
      <div
        :class="codingActivity.state.toLowerCase().includes('editing') ? 'bg-green-500' : 'bg-amber-500'"
        class="h-3 w-3 inline-flex rounded-full cursor-help mt-7"
      />
    </UTooltip>
    <p v-if="codingActivity.state.toLowerCase().includes('editing')">
      I'm actually working on <strong>{{ codingActivity.details }}</strong>, {{ codingActivity.state.toLowerCase() }}
      using <strong>{{ codingActivity.name }}</strong>.
      I've started <strong>{{ useTimeAgo(codingActivity.timestamps.start).value }}</strong>, the
      <strong>{{ formatDate(codingActivity.timestamps.start) }}</strong>.
    </p>
    <p v-else>
      I'm Idling on my computer with <strong>{{ codingActivity.name }}</strong> running in background.
    </p>
  </div>
  <div
    v-else
    class="flex items-center gap-2"
  >
    <UTooltip text="I'm offline 🫥">
      <div class="h-3 w-3 inline-flex rounded-full bg-red-500" />
    </UTooltip>
    <p>
      I'm currently offline. Come back later to see what I'm working on.
    </p>
  </div>
</template>
