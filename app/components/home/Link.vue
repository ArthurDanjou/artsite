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
    type: String,
    default: ''
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
    class="sofia flex gap-1 items-center group"
  >
    <Icon
      v-if="icon"
      :name="icon"
      size="20"
    />
    <span
      class="duration-300 underline-offset-2 font-semibold text-md text-black dark:text-white underline decoration-gray-300 dark:decoration-neutral-700 group-hover:decoration-black dark:group-hover:decoration-white"
    >
      {{ label }}
    </span>
  </NuxtLink>
</template>
