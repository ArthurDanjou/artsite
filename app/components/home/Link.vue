<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  blanked: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <NuxtLink
    :href="href"
    :target="blanked ? '_blank' : '_self'"
    class="sofia border-b border-gray-200 hover:border-black duration-300 dark:border-neutral-800 dark:hover:border-white flex gap-1 items-center pb-.5"
  >
    <Icon
      v-if="icon"
      :name="icon"
      size="20"
    />
    <span class="font-bold text-md text-black dark:text-white">{{ label }}</span>
  </NuxtLink>
</template>
