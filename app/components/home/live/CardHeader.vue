<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  titleSize?: 'sm' | 'lg'
  icon?: string
  iconBg?: string
}>(), {
  iconBg: 'bg-primary-50 dark:bg-primary-900/30 text-primary-500',
  titleSize: 'lg'
})
</script>

<template>
  <div class="flex items-center justify-between gap-3 relative z-10">
    <div class="flex items-center gap-3">
      <div
        v-if="icon"
        class="p-2 rounded-lg flex items-center justify-center"
        :class="iconBg"
      >
        <UIcon
          :name="icon"
          class="w-5 h-5"
        />
      </div>
      <h3
        class="font-bold text-neutral-900 dark:text-white"
        :class="titleSize === 'sm' ? 'text-sm' : 'text-lg'"
      >
        {{ title }}
      </h3>
    </div>
    <slot name="right" />
  </div>
</template>
