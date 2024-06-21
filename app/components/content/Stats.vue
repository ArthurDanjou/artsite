<script lang="ts" setup>
import type { Stats } from '~~/types'

const stats = await $fetch<Stats>('/api/stats')
</script>

<template>
  <p v-if="stats">
    I collect some data for {{ useTimeAgo(new Date(stats.coding.data.range.start)).value }}, started the
    <strong>{{ useDateFormat(new Date(stats.coding.data.range.start), 'Do MMMM YYYY').value }}</strong>.
    I've coded for a total of <strong>{{
      usePrecision(stats.coding.data.grand_total.total_seconds_including_other_language / 3600, 0)
    }}</strong> hours.
    My best editors are
    {{ stats.editors.data.slice(0, 2).map(editor => `${editor.name} (${editor.percent}%)`).join(' and ') }}.
    My best OS is {{ stats.os.data[0].name }} ({{ stats.os.data[0].percent }}%).
    My top languages are
    {{ stats.languages.data.slice(0, 2).map(language => `${language.name} (${language.percent}%)`).join(' and ') }}.
  </p>
</template>
