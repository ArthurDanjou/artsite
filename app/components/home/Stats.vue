<script lang="ts" setup>
import type { Stats } from '~~/types'
import { usePrecision } from '@vueuse/math'

const { data: stats } = await useAsyncData<Stats>('stats', () => $fetch('/api/stats'))

const time = useTimeAgo(new Date(stats.value?.coding.range.start ?? 0)).value.split(' ')[0]
const date = useDateFormat(new Date(stats.value?.coding.range.start ?? 0), 'DD MMMM YYYY')
const hours = usePrecision((stats.value?.coding.grand_total.total_seconds_including_other_language ?? 0) / 3600, 0)

const editors = computed(() => stats.value?.editors.slice(0, 3).map(editor => `${editor.name} (${editor.percent}%)`).join(', '))
const os = computed(() => stats.value?.os.slice(0, 2).map(os => `${os.name} (${os.percent}%)`).join(', '))
const languages = computed(() => stats.value?.languages.slice(0, 3).map(language => `${language.name} (${language.percent}%)`).join(', '))
</script>

<template>
  <ClientOnly>
    <div
      v-if="time && date && hours && stats"
      class="space-y-1"
    >
      <p>
        I collect some data for {{ time }} years, started the
        <HoverText
          hover="That was so long ago 🫣"
          :text="date"
        />.
        I've coded for a total of
        <HoverText
          hover="That's a lot 😮"
          :text="hours"
        />
        hours.
      </p>
      <p>
        My best editors are {{ editors || 'N/A' }}. My best OS is {{ os || 'N/A' }}. My top languages are
        {{ languages || 'N/A' }}.
      </p>
    </div>
  </ClientOnly>
</template>
