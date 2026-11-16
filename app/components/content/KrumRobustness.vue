<script setup lang="ts">
import type { AccuracyPoint } from '~/utils/krum-benchmark'
import {
  KRUM_ATTACKED_ACCURACY,
  KRUM_CLEAN_ACCURACY,
  KRUM_SPAMBASE_BYZANTINE,
  KRUM_SPAMBASE_ROUNDS,
  KRUM_SPAMBASE_WORKERS
} from '~/utils/krum-benchmark'

interface Run {
  key: string
  label: string
  points: readonly AccuracyPoint[]
  stroke: string
  fill: string
  swatch: string
  dash?: string
}

const WIDTH = 560
const HEIGHT = 220
const PADDING = { top: 18, right: 10, bottom: 24, left: 34 }
const Y_TICKS = [0.4, 0.5, 0.6, 0.7, 0.8]
const X_TICKS = [0, 100, 200, 300]
const Y_MIN = 0.35
const Y_MAX = 0.85

const innerWidth = WIDTH - PADDING.left - PADDING.right
const innerHeight = HEIGHT - PADDING.top - PADDING.bottom

const attacked = ref(false)
const hovered = shallowRef<number | null>(null)
const plot = useTemplateRef<SVGSVGElement>('plot')

const runs = computed<Run[]>(() => {
  if (!attacked.value) {
    return [{
      key: 'clean',
      label: 'Average = MultiKrum',
      points: KRUM_CLEAN_ACCURACY,
      stroke: 'stroke-neutral-900 dark:stroke-neutral-100',
      fill: 'fill-neutral-900 dark:fill-neutral-100',
      swatch: 'bg-neutral-900 dark:bg-neutral-100'
    }]
  }
  return [
    {
      key: 'clean',
      label: 'No adversary',
      points: KRUM_CLEAN_ACCURACY,
      stroke: 'stroke-neutral-300 dark:stroke-neutral-700',
      fill: 'fill-neutral-300 dark:fill-neutral-700',
      swatch: 'bg-neutral-300 dark:bg-neutral-700',
      dash: '2 4'
    },
    {
      key: 'average',
      label: 'Average',
      points: KRUM_ATTACKED_ACCURACY.average,
      stroke: 'stroke-neutral-400 dark:stroke-neutral-500',
      fill: 'fill-neutral-400 dark:fill-neutral-500',
      swatch: 'bg-neutral-400 dark:bg-neutral-500',
      dash: '5 4'
    },
    {
      key: 'multiKrum',
      label: 'MultiKrum',
      points: KRUM_ATTACKED_ACCURACY.multiKrum,
      stroke: 'stroke-neutral-900 dark:stroke-neutral-100',
      fill: 'fill-neutral-900 dark:fill-neutral-100',
      swatch: 'bg-neutral-900 dark:bg-neutral-100'
    }
  ]
})

const lastIndex = KRUM_CLEAN_ACCURACY.length - 1
const activeIndex = computed(() => hovered.value ?? lastIndex)
const crosshairX = computed(() => x(KRUM_CLEAN_ACCURACY[activeIndex.value]![0]))

const description = computed(() => attacked.value
  ? 'Test accuracy over 300 rounds on Spambase with six of twenty workers attacking. MultiKrum reaches 77.2 percent while Average stays flat at 59.6 percent.'
  : 'Test accuracy over 300 rounds on Spambase with no adversary. Average and MultiKrum both reach 82.4 percent.')

function x(round: number) {
  return PADDING.left + (round / KRUM_SPAMBASE_ROUNDS) * innerWidth
}

function y(accuracy: number) {
  return PADDING.top + ((Y_MAX - accuracy) / (Y_MAX - Y_MIN)) * innerHeight
}

function path(points: readonly AccuracyPoint[]) {
  return points
    .map(([round, accuracy], index) => `${index === 0 ? 'M' : 'L'}${x(round).toFixed(1)},${y(accuracy).toFixed(1)}`)
    .join(' ')
}

function percent(value: number) {
  return `${(value * 100).toFixed(1)} %`
}

function updateHover(event: PointerEvent) {
  const element = plot.value
  if (!element) return
  const bounds = element.getBoundingClientRect()
  const chartX = ((event.clientX - bounds.left) / bounds.width) * WIDTH
  const index = Math.round(((chartX - PADDING.left) / innerWidth) * lastIndex)
  hovered.value = Math.min(lastIndex, Math.max(0, index))
}
</script>

<template>
  <figure
    class="not-prose my-8 rounded-2xl border border-neutral-200 bg-default p-5 sm:p-7 dark:border-default dark:bg-elevated/30"
  >
    <div class="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
      <div>
        <p class="text-xs font-medium uppercase tracking-wider text-muted">
          Krum · Spambase
        </p>
        <p class="mt-1 text-sm text-toned">
          Test accuracy per round ·
          <span class="font-mono text-highlighted">{{
            hovered === null ? 'final' : `round ${KRUM_CLEAN_ACCURACY[activeIndex]![0]}`
          }}</span>
        </p>
      </div>
      <USwitch
        v-model="attacked"
        label="Sign-flip attack"
        :description="`${KRUM_SPAMBASE_BYZANTINE} of ${KRUM_SPAMBASE_WORKERS} workers`"
        size="sm"
      />
    </div>

    <svg
      ref="plot"
      :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
      class="mt-4 block w-full touch-pan-y select-none"
      role="img"
      :aria-label="description"
      @pointermove="updateHover"
      @pointerdown="updateHover"
      @pointerleave="hovered = null"
    >
      <line
        v-for="tick in Y_TICKS"
        :key="`grid-${tick}`"
        :x1="PADDING.left"
        :x2="WIDTH - PADDING.right"
        :y1="y(tick)"
        :y2="y(tick)"
        class="stroke-neutral-200 dark:stroke-neutral-800"
        :stroke-dasharray="tick === 0.6 ? undefined : '3 4'"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
      <text
        v-for="tick in Y_TICKS"
        :key="`y-label-${tick}`"
        :x="PADDING.left - 6"
        :y="y(tick)"
        text-anchor="end"
        dominant-baseline="middle"
        font-size="10"
        class="fill-neutral-400 tabular-nums dark:fill-neutral-500"
      >{{ Math.round(tick * 100) }}%</text>
      <text
        v-for="tick in X_TICKS"
        :key="`x-label-${tick}`"
        :x="x(tick)"
        :y="HEIGHT - 6"
        text-anchor="middle"
        font-size="10"
        class="fill-neutral-400 tabular-nums dark:fill-neutral-500"
      >{{ tick }}</text>

      <line
        v-if="hovered !== null"
        :x1="crosshairX"
        :x2="crosshairX"
        :y1="PADDING.top"
        :y2="HEIGHT - PADDING.bottom"
        class="stroke-neutral-300 dark:stroke-neutral-700"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
      <path
        v-for="run in runs"
        :key="run.key"
        :d="path(run.points)"
        fill="none"
        :class="run.stroke"
        :stroke-dasharray="run.dash"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
      <g v-if="hovered !== null">
        <circle
          v-for="run in runs"
          :key="`dot-${run.key}`"
          :cx="crosshairX"
          :cy="y(run.points[activeIndex]![1])"
          r="3"
          :class="run.fill"
        />
      </g>
    </svg>

    <ul class="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-3">
      <li
        v-for="run in runs"
        :key="`legend-${run.key}`"
        class="flex items-center gap-2"
      >
        <span
          class="h-0.5 w-4 shrink-0 rounded-full"
          :class="run.swatch"
          aria-hidden="true"
        />
        <span class="text-toned">{{ run.label }}</span>
        <span class="ml-auto font-mono tabular-nums text-highlighted">{{ percent(run.points[activeIndex]![1]) }}</span>
      </li>
    </ul>

    <figcaption
      class="mt-4 border-t border-neutral-200 pt-3 text-xs leading-relaxed text-muted dark:border-default"
    >
      MLP 57 → 20 → 20 → 2, learning rate 0.01, batch size 3, IID partition,
      seed 42, sign-flip scale 10. Under attack, Average settles on the Spambase
      majority class (59.6 %), a constant predictor, while MultiKrum keeps
      learning. With no adversary the two rules coincide, because MultiKrum then
      runs with m = n. Recorded by Krum's orchestrator, not a schematic.
    </figcaption>
  </figure>
</template>
