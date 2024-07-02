<template>
  <ClientOnly>
    <div
      v-if="width > 1024"
      class="group text-[12px] italic flex items-center gap-1"
    >
      <UIcon
        class="transform -rotate-12 duration-300 group-hover:animate-wave"
        name="i-ph-hand-pointing-duotone"
      />
      <p>Hover the bold texts to find out more about me.</p>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { width } = useWindowSize()
</script>
