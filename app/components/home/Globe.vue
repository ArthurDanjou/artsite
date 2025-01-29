<script setup lang="ts">
import createGlobe from 'cobe'

const { t } = useI18n({
  useScope: 'local',
})

const myLocation = useState<{ longitude: number, latitude: number }>('location')
const globe = ref<HTMLCanvasElement | null>(null)
const phi = ref(0)
const locations = ref<Array<{ latitude: number, longitude: number }>>([])

const { data, open } = useWebSocket(`/visitors?latitude=${myLocation.value.latitude}&longitude=${myLocation.value.longitude}`, { immediate: true })
watch(data, async (newData) => {
  locations.value = JSON.parse(typeof newData === 'string' ? newData : await newData.text())
})

onMounted(() => {
  open()
  createGlobe(globe.value!, {
    devicePixelRatio: 2,
    width: 400 * 2,
    height: 400 * 2,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    scale: 1,
    mapSamples: 20000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 0.1],
    glowColor: [0.2, 0.2, 0.2],
    markers: [],
    opacity: 0.3,
    onRender(state) {
      state.markers = locations.value.map(location => ({
        location: [location.latitude, location.longitude],
        size: myLocation.value.latitude === location.latitude && myLocation.value.longitude === location.longitude ? 0.1 : 0.05,
      }))
      state.phi = phi.value
      phi.value += 0.01
    },
  })
})
</script>

<template>
  <section class="mt-12 not-prose w-full flex flex-col items-center justify-center">
    <canvas ref="globe" />
    <!-- <ClientOnly>
      <div class="group text-[12px] flex items-center gap-1">
        <UIcon
          name="i-ph-map-pin-duotone"
        />
        <p>{{ t('globe') }}</p>
      </div>
    </ClientOnly> -->
  </section>
</template>

<style scoped>
canvas {
  width: 400px;
  height: 400px;
  max-width: 100%;
  aspect-ratio: 1;
}
</style>

<i18n>
{
  "en": {
    "globe": "Each marker represents a visitor connected to my site."
  },
  "fr": {
    "globe": "Chaque point représente un visiteur connecté sur mon site."
  },
  "es": {
    "globe": "Cada marcador representa un visitante conectado a mi sitio."
  }
}
</i18n>
