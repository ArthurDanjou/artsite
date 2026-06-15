<script lang="ts" setup>
</script>

<template>
  <p class="mb-4">
    Live telemetry from my homelab — my
    <HoverText
      hover="OS, Editor, Activity"
      text="current environment"
    />, system status, and activity history at a glance.
  </p>

  <HomeLiveArtHomeStatus class="mb-4" />

  <div class="flex flex-col lg:flex-row gap-4 mb-4">
    <div class="flex-1 min-w-0">
      <HomeLiveStatusPage />
    </div>
    <div class="flex-1 min-w-0">
      <HomeLiveActivity class="h-full" />
    </div>
  </div>

  <HomeLiveStats />
</template>
