<script setup lang="ts">
const styleVars = {
  '--animated-speed': '50s',
}
</script>

<template>
  <span
    class="inline-block font-bold animate-gradient"
    :style="styleVars"
  >
    <slot>Arthur Danjou</slot>
  </span>
</template>

<style scoped>
.animate-gradient {
  background-image: linear-gradient(
    90deg,
    #f43f5e, #f97316, #f59e0b, #eab308, #84cc16, #22c55e,
    #10b981, #14b8a6, #06b6d4, #0ea5e9, #3b82f6, #6366f1,
    #8b5cf6, #a855f7, #d946ef, #ec4899, #f43f5e
  );
  background-size: 1400% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: gradient-animation var(--animated-speed) linear infinite;
}

@keyframes gradient-animation {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}
</style>
