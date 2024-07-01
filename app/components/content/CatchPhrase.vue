<template>
  <ClientOnly>
    <div
      v-if="width > 1024"
      class="text-[12px] italic flex items-center gap-1"
    >
      <UIcon
        class="transform -rotate-12"
        name="i-ph-hand-pointing-duotone"
      />
      <p>Hover some of the bold text to find out more about me.</p>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { width } = useWindowSize()
</script>
