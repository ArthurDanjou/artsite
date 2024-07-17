<script lang="ts" setup>
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const zoom = ref(11)
const coordinates = ref<[number, number]>([2.179040, 48.877419])

function adjustZoom(amount: number) {
  const targetZoom = zoom.value + amount
  const frameRate = 1000 / 60
  const step = amount / 20

  const interval = setInterval(() => {
    if ((amount > 0 && zoom.value < targetZoom) || (amount < 0 && zoom.value > targetZoom)) {
      zoom.value += step
    }
    else {
      clearInterval(interval)
    }
  }, frameRate)
}

const { t } = useI18n({
  useScope: 'local'
})
</script>

<template>
  <div class="flex items-center justify-center mt-4 flex-col space-y-1">
    <div class="relative h-80 md:h-96 w-full">
      <MapboxMap
        :options="{
          style: isDark ? 'mapbox://styles/arthurdanjou/clyor1rad005y01pibypu165j' : 'mapbox://styles/arthurdanjou/clyorg3yl018r01pi6esv8ab8',
          center: coordinates,
          zoom,
          projection: 'globe'
        }"
        class="relative z-10"
        map-id="map"
      >
        <MapboxDefaultMarker
          :lnglat="coordinates"
          :options="{
            color: '#808080',
            size: 1.5
          }"
          marker-id="marker"
        />
      </MapboxMap>
      <div
        v-show="zoom < 15"
        class="map-button left-2"
        @click.prevent="adjustZoom(1)"
      >
        <UIcon
          name="i-ph-plus-bold"
          size="24"
        />
      </div>
      <div
        v-show="zoom > 0"
        class="map-button right-2"
        @click.prevent="adjustZoom(-1)"
      >
        <UIcon
          name="i-ph-minus-bold"
          size="24"
        />
      </div>
    </div>
    <div class="flex gap-3 items-center group">
      <div class="flex items-center justify-center group-hover:animate-slide duration-300">
        <UIcon
          name="i-ph-hand-grabbing-duotone"
          size="16"
        />
      </div>
      <p class="text-[12px] italic">
        {{ t('caption') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.map-button {
  @apply z-30 absolute bottom-2 dark:bg-gray-800 dark:hover:bg-gray-900 bg-gray-200 hover:bg-gray-100 duration-300 border border-neutral-300 dark:border-neutral-700 cursor-pointer flex items-center justify-center rounded-full p-2
}

.mapboxgl-control-container {
  display: none !important;
}

.mapboxgl-canvas {
  border-radius: 1rem;
}
</style>

<i18n lang="json">
{
  "en": {
    "caption": "Where I live"
  },
  "fr": {
    "caption": "Où j'habite"
  },
  "es": {
    "caption": "Donde vivo"
  }
}
</i18n>
