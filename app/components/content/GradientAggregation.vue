<script setup lang="ts">
import type { Point } from '~/utils/aggregation'
import {
  ADVERSARIAL_OFFSETS,
  HONEST_GRADIENTS,
  average,
  geometricMedian,
  multiKrum
} from '~/utils/aggregation'

const WIDTH = 520
const HEIGHT = 300
const DEFAULT_COUNT = 10
const DEFAULT_HANDLE: Point = { x: 386, y: 88 }
const GRID_COLUMNS = [65, 130, 195, 260, 325, 390, 455]
const GRID_ROWS = [50, 100, 150, 200, 250]

const count = ref(DEFAULT_COUNT)
const handle = ref<Point>({ ...DEFAULT_HANDLE })
const dragging = ref(false)
const plot = useTemplateRef<SVGSVGElement>('plot')

const adversaries = computed(() =>
  ADVERSARIAL_OFFSETS.slice(0, count.value).map(offset => ({
    x: handle.value.x + offset.x,
    y: handle.value.y + offset.y
  }))
)

const points = computed(() => [...HONEST_GRADIENTS, ...adversaries.value])
const averagePoint = computed(() => average(points.value))
const medianPoint = computed(() => geometricMedian(points.value))
const krumPoint = computed(() => multiKrum(points.value, count.value))
const honestCenter = average(HONEST_GRADIENTS)
const drift = computed(() =>
  Math.round(Math.hypot(averagePoint.value.x - honestCenter.x, averagePoint.value.y - honestCenter.y))
)

function moveHandle(x: number, y: number) {
  handle.value = {
    x: Math.min(WIDTH - 30, Math.max(30, x)),
    y: Math.min(HEIGHT - 30, Math.max(30, y))
  }
}

function drag(event: PointerEvent) {
  const element = plot.value
  if (!dragging.value || !element) return
  const bounds = element.getBoundingClientRect()
  moveHandle(
    ((event.clientX - bounds.left) * WIDTH) / bounds.width,
    ((event.clientY - bounds.top) * HEIGHT) / bounds.height
  )
}

function startDrag(event: PointerEvent) {
  if (event.button !== 0) return
  dragging.value = true
  const target = event.currentTarget as Element
  target.setPointerCapture(event.pointerId)
  drag(event)
}

function moveWithKeyboard(event: KeyboardEvent) {
  const step = event.shiftKey ? 24 : 8
  const moves: Record<string, readonly [number, number]> = {
    ArrowLeft: [-step, 0],
    ArrowRight: [step, 0],
    ArrowUp: [0, -step],
    ArrowDown: [0, step]
  }
  const move = moves[event.key]
  if (!move) return
  event.preventDefault()
  moveHandle(handle.value.x + move[0], handle.value.y + move[1])
}

function reset() {
  count.value = DEFAULT_COUNT
  handle.value = { ...DEFAULT_HANDLE }
}
</script>

<template>
  <figure
    class="not-prose my-8 rounded-2xl border border-neutral-200 bg-default p-5 sm:p-7 dark:border-default dark:bg-elevated/30"
  >
    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="text-xs font-medium uppercase tracking-wider text-muted">
        Gradient space · schematic
      </p>
      <UBadge
        color="neutral"
        variant="subtle"
        size="sm"
      >
        Move the attackers
        <UIcon
          name="i-ph-cursor-duotone"
          class="ml-1 size-3.5"
        />
      </UBadge>
    </div>

    <svg
      ref="plot"
      :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
      class="mt-4 block w-full touch-pan-y select-none"
      role="group"
      aria-label="Forty honest gradients and a group of adversarial gradients aggregated by Average, geometric median and MultiKrum. Drag the attackers, or focus the handle and use the arrow keys."
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
      @lostpointercapture="dragging = false"
    >
      <line
        v-for="column in GRID_COLUMNS"
        :key="`column-${column}`"
        :x1="column"
        :x2="column"
        :y1="0"
        :y2="HEIGHT"
        class="stroke-neutral-200 dark:stroke-neutral-800"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
      <line
        v-for="row in GRID_ROWS"
        :key="`row-${row}`"
        :x1="0"
        :x2="WIDTH"
        :y1="row"
        :y2="row"
        class="stroke-neutral-200 dark:stroke-neutral-800"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />

      <line
        v-if="count"
        :x1="averagePoint.x"
        :y1="averagePoint.y"
        :x2="krumPoint.x"
        :y2="krumPoint.y"
        class="stroke-neutral-400 dark:stroke-neutral-500"
        stroke-dasharray="4 5"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />

      <circle
        v-for="(point, index) in HONEST_GRADIENTS"
        :key="`honest-${index}`"
        :cx="point.x"
        :cy="point.y"
        r="3.2"
        class="fill-neutral-400/60 dark:fill-neutral-500"
      />

      <path
        v-for="(point, index) in adversaries"
        :key="`adversary-${index}`"
        :d="`M${point.x - 3.5},${point.y - 3.5}l7,7m0,-7l-7,7`"
        class="stroke-neutral-900 dark:stroke-neutral-100"
        stroke-width="1.6"
        stroke-linecap="round"
      />

      <g
        v-if="count"
        class="cursor-grab touch-none active:cursor-grabbing"
        role="button"
        tabindex="0"
        aria-label="Move the adversarial workers. Drag, or use the arrow keys."
        @pointerdown="startDrag"
        @keydown="moveWithKeyboard"
      >
        <circle
          :cx="handle.x"
          :cy="handle.y"
          r="32"
          fill="transparent"
          class="stroke-neutral-400 dark:stroke-neutral-600"
          stroke-dasharray="3 5"
          stroke-width="1"
        />
        <text
          :x="handle.x"
          :y="handle.y + 46"
          text-anchor="middle"
          class="fill-neutral-500 text-[11px] dark:fill-neutral-400"
        >drag me</text>
      </g>

      <rect
        :x="averagePoint.x - 6"
        :y="averagePoint.y - 6"
        width="12"
        height="12"
        class="fill-neutral-500 stroke-neutral-500 dark:fill-neutral-400 dark:stroke-neutral-400"
        stroke-width="1.6"
      ><title>Average</title></rect>
      <path
        :d="`M${medianPoint.x},${medianPoint.y - 8}l8,8l-8,8l-8,-8Z`"
        class="fill-neutral-500 dark:fill-neutral-400"
      ><title>Geometric median</title></path>
      <path
        :d="`M${krumPoint.x},${krumPoint.y - 9}l8,14h-16Z`"
        class="fill-neutral-900 dark:fill-neutral-100"
      ><title>MultiKrum</title></path>
    </svg>

    <div class="mt-4 grid grid-cols-[1fr_auto] items-center gap-x-3">
      <span
        id="attackers-label"
        class="text-xs text-toned"
      >Adversarial workers</span>
      <span class="font-mono tabular-nums text-xs text-highlighted">{{ count.toString().padStart(2, '0') }}</span>
      <USlider
        v-model="count"
        :min="0"
        :max="20"
        :step="1"
        color="neutral"
        size="sm"
        class="col-span-full py-2"
        aria-labelledby="attackers-label"
      />
    </div>

    <ul class="mt-2 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
      <li class="flex items-center gap-2">
        <span
          class="size-2 shrink-0 rounded-full bg-neutral-400/60 dark:bg-neutral-500"
          aria-hidden="true"
        />
        <span class="text-toned">Honest gradient</span>
      </li>
      <li class="flex items-center gap-2">
        <span
          class="font-mono leading-none text-highlighted"
          aria-hidden="true"
        >×</span>
        <span class="text-toned">Adversarial gradient</span>
      </li>
      <li class="flex items-center gap-2">
        <span
          class="size-2 shrink-0 bg-neutral-500 dark:bg-neutral-400"
          aria-hidden="true"
        />
        <span class="text-toned">Average</span>
      </li>
      <li class="flex items-center gap-2">
        <span
          class="size-2 shrink-0 rotate-45 bg-neutral-500 dark:bg-neutral-400"
          aria-hidden="true"
        />
        <span class="text-toned">Geometric median</span>
      </li>
      <li class="flex items-center gap-2">
        <span
          class="size-0 shrink-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-neutral-900 dark:border-b-neutral-100"
          aria-hidden="true"
        />
        <span class="text-toned">MultiKrum</span>
        <UBadge
          color="neutral"
          variant="subtle"
          size="xs"
        >
          as implemented in Krum
        </UBadge>
      </li>
    </ul>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-3 dark:border-default">
      <p class="text-xs text-toned">
        Average drift
        <strong class="ml-1 font-mono tabular-nums text-highlighted">{{ drift }}</strong>
        <span class="text-muted">plot units from the honest centre</span>
      </p>
      <UButton
        color="neutral"
        variant="link"
        size="xs"
        icon="i-ph-arrow-counter-clockwise-duotone"
        @click="reset"
      >
        Reset
      </UButton>
    </div>

    <figcaption class="mt-3 text-xs leading-relaxed text-muted">
      Forty honest workers send gradients clustered around the consensus
      direction; the attackers send whatever you drag them to. All three rules
      aggregate the same points, so the markers show where each one would take
      the model. Pull the attackers away and the average follows them, the
      geometric median barely moves, and MultiKrum stays on the honest cluster.
      Two dimensions, for intuition: the recorded curves above carry the real
      numbers.
    </figcaption>
  </figure>
</template>
