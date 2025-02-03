<script lang="ts" setup>
import type { COBEOptions } from 'cobe'
import createGlobe from 'cobe'
import { useSpring } from 'vue-use-spring'

interface GlobeProps {
  class?: string
  config?: Partial<COBEOptions>
  mass?: number
  tension?: number
  friction?: number
  precision?: number
  locations?: Array<{ latitude: number, longitude: number }>
  myLocation?: { latitude: number, longitude: number }
}

const props = withDefaults(defineProps<GlobeProps>(), {
  mass: 1,
  tension: 280,
  friction: 100,
  precision: 0.001,
})

const DEFAULT_CONFIG: COBEOptions = {
  width: 400,
  height: 400,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 20000,
  mapBrightness: 1.7,
  baseColor: [0.5, 0.5, 0.5],
  opacity: 0.7,
  markerColor: [160 / 255, 160 / 255, 160 / 255],
  glowColor: [0.4, 0.4, 0.4],
  markers: [],
}

const globeCanvasRef = ref<HTMLCanvasElement>()
const phi = ref(0)
const width = ref(0)
const pointerInteracting = ref()
const pointerInteractionMovement = ref()

let globe: ReturnType<typeof createGlobe> | null = null

const spring = useSpring(
  {
    r: 0,
  },
  {
    mass: props.mass,
    tension: props.tension,
    friction: props.friction,
    precision: props.precision,
  },
)

function updatePointerInteraction(clientX: number | null) {
  if (clientX !== null) {
    pointerInteracting.value = clientX - (pointerInteractionMovement.value ?? clientX)
  }
  else {
    pointerInteracting.value = null
  }

  if (globeCanvasRef.value) {
    globeCanvasRef.value.style.cursor = clientX ? 'grabbing' : 'grab'
  }
}

function updateMovement(clientX: number) {
  if (pointerInteracting.value !== null) {
    const delta = clientX - (pointerInteracting.value ?? clientX)
    pointerInteractionMovement.value = delta
    spring.r = delta / 200
  }
}

function onRender(state: Record<string, unknown>) {
  if (!pointerInteracting.value) {
    phi.value += 0.005
  }

  state.phi = phi.value + spring.r
  state.width = width.value * 2
  state.height = width.value * 2
  state.markers = props.locations?.map(location => ({
    location: [location.latitude, location.longitude],
    size: props.myLocation?.latitude === location.latitude && props.myLocation?.longitude === location.longitude ? 0.1 : 0.05,
  }))
}

function onResize() {
  if (globeCanvasRef.value) {
    width.value = globeCanvasRef.value.offsetWidth
  }
}

function createGlobeOnMounted() {
  const config = { ...DEFAULT_CONFIG, ...props.config }

  globe = createGlobe(globeCanvasRef.value!, {
    ...config,
    width: width.value,
    height: width.value,
    onRender,
  })
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()
  createGlobeOnMounted()

  setTimeout(() => (globeCanvasRef.value!.style.opacity = '1'))
})

onBeforeUnmount(() => {
  globe?.destroy()
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div :class="props.class">
    <canvas
      ref="globeCanvasRef"
      class="size-full opacity-0 transition-opacity duration-1000 ease-in-out [contain:layout_paint_size]"
      @pointerdown="(e) => updatePointerInteraction(e.clientX)"
      @pointerup="updatePointerInteraction(null)"
      @pointerout="updatePointerInteraction(null)"
      @mousemove="(e) => updateMovement(e.clientX)"
      @touchmove="(e) => e.touches[0] && updateMovement(e.touches[0].clientX)"
    />
  </div>
</template>
