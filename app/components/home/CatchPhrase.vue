<script lang="ts" setup>
const { width } = useWindowSize()
</script>

<template>
  <ClientOnly>
    <div
      v-if="width > 1024"
      class="text-[12px] italic flex items-center gap-1 mt-4"
    >
      <UIcon
        class="transform -rotate-12 duration-300 animate-wave"
        name="i-ph-hand-pointing-duotone"
      />
      <p>Hover the bold texts to find out more about me.</p>
    </div>
  </ClientOnly>
</template>
