<script lang="ts" setup>
const points = useState(() => Array.from({ length: 45 }).fill(0).map(() => [Math.random(), Math.random()]))
const poly = computed(() => points.value.map(([x, y]) => `${x! * 100}% ${y! * 100}%`).join(', '))

function jumpVal(val: number) {
  return Math.random() > 0.5 ? val + (Math.random() - 0.5) / 2 : Math.random()
}

let timeout: NodeJS.Timeout
function jumpPoints() {
  for (let i = 0; i < points.value.length; i++)
    points.value[i] = [jumpVal(points.value[i][0]), jumpVal(points.value[i][1])]

  timeout = setTimeout(jumpPoints, Math.random() * 1000)
}

onMounted(() => jumpPoints())
onUnmounted(() => clearTimeout(timeout))

const route = useRoute()
</script>

<template>
  <ClientOnly>
    <div
      v-show="route.path === '/'"
      aria-hidden="true"
      class="duration-300 bg sm:mx-8 absolute inset-0 z-20 transform-gpu blur-3xl overflow-hidden"
    >
      <div
        :style="{ 'clip-path': `polygon(${poly})` }"
        class="aspect-[2] h-full w-full bg-gradient-to-r from-neutral-400 dark:from-neutral-600 to-white/10 lg:opacity-30 xs:opacity-50"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.bg > div {
  clip-path: circle(75%);
  transition: clip-path 3s;
}

.light .bg > div {
  opacity: 1 !important;
}
</style>
