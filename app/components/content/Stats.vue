<script lang="ts" setup>
import type { Stats } from '~~/types'

const { data: stats } = await useFetch<Stats>('/api/stats')
</script>

<template>
  <ClientOnly>
    <p v-if="stats">
      I collect some data for {{ useTimeAgo(new Date(stats.coding.data.range.start)).value }}, started the
      <HoverText
        :text="useDateFormat(new Date(stats.coding.data.range.start), 'Do MMMM YYYY').value"
        hover="That was so long ago 🫣"
      />
      .
      I've coded for a total of
      <HoverText
        :text="usePrecision(stats.coding.data.grand_total.total_seconds_including_other_language / 3600, 0).value"
        hover="That's a lot 😮"
      />
      hours.
      My best editors are
      {{ stats.editors.data.slice(0, 2).map(editor => `${editor.name} (${editor.percent}%)`).join(' and ') }}.
      <template v-if="stats.os.data[0]">
        My best OS is {{ stats.os.data[0].name }} ({{ stats.os.data[0].percent }}%).
      </template>
      My top languages are
      {{ stats.languages.data.slice(0, 2).map(language => `${language.name} (${language.percent}%)`).join(' and ') }}.
    </p>
  </ClientOnly>
</template>
