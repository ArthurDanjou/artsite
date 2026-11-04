<script lang="ts" setup>
interface LinkClickStat {
  slug: string
  clicks: number
  title: string
  icon: string | null
  category: string
}

interface DailyClicks {
  date: string
  clicks: number
}

interface LinkClicksResponse {
  total: number
  last7Days: number
  trackedLinks: number
  links: LinkClickStat[]
  daily: DailyClicks[]
  countries: Array<{ code: string, name: string, clicks: number }>
  devices: Array<{ name: string, clicks: number }>
  operatingSystems: Array<{ name: string, clicks: number }>
  sources: Array<{
    name: string
    kind: 'campaign' | 'referrer' | 'direct'
    clicks: number
  }>
  browsers: Array<{ name: string, clicks: number }>
  cities: Array<{
    name: string
    region: string | null
    country: string | null
    countryName: string | null
    clicks: number
  }>
  networks: Array<{ name: string, asn: number | null, clicks: number }>
}

const { data, pending, error } = useLiveFetch<LinkClicksResponse>(
  '/api/link-clicks',
  {
    server: false,
    lazy: true,
    pollInterval: 60_000
  }
)

const chartEl = ref<HTMLElement | null>(null)
const svgEl = ref<SVGSVGElement | null>(null)
const { width: chartWidth } = useElementSize(chartEl)

const CHART_HEIGHT = 180
const CHART_PADDING = { top: 14, right: 10, bottom: 24, left: 34 }

const areaGradientId = `link-clicks-area-${useId()}`

const dailySeries = computed(() => data.value?.daily ?? [])
const periodTotal = computed(() =>
  dailySeries.value.reduce((sum, day) => sum + day.clicks, 0)
)
const averagePerDay = computed(() =>
  dailySeries.value.length
    ? periodTotal.value / dailySeries.value.length
    : 0
)
const peakDay = computed(() =>
  dailySeries.value.reduce<DailyClicks | null>(
    (best, day) => (!best || day.clicks > best.clicks ? day : best),
    null
  )
)
const hasClicks = computed(() => periodTotal.value > 0)

const formatDay = (date?: string) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      })
    : ''

const formatDayLong = (date?: string) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      })
    : ''

const niceScale = (peak: number) => {
  let magnitude = 1
  for (let power = 0; power < 6; power++) {
    for (const candidate of [1, 2, 5, 10]) {
      const step = candidate * magnitude
      const intervals = Math.ceil(peak / step)
      if (intervals <= 5) return { step, intervals }
    }
    magnitude *= 10
  }
  return { step: Math.max(peak, 1), intervals: 1 }
}

/**
 * Monotone cubic interpolation, so the curve never overshoots the daily counts.
 */
const monotonePath = (points: Array<{ x: number, y: number }>) => {
  if (!points.length) return ''
  if (points.length === 1) {
    return `M${points[0]!.x.toFixed(1)},${points[0]!.y.toFixed(1)}`
  }

  const count = points.length
  const tangents: number[] = []

  for (let index = 1; index < count - 1; index++) {
    const previous = points[index - 1]!
    const current = points[index]!
    const next = points[index + 1]!
    const h0 = current.x - previous.x || 1
    const h1 = next.x - current.x || 1
    const slope0 = (current.y - previous.y) / h0
    const slope1 = (next.y - current.y) / h1

    if (slope0 * slope1 <= 0) {
      tangents[index] = 0
      continue
    }

    const weighted = (slope0 * h1 + slope1 * h0) / (h0 + h1)
    tangents[index]
      = (Math.sign(slope0) + Math.sign(slope1))
        * Math.min(
          Math.abs(slope0),
          Math.abs(slope1),
          0.5 * Math.abs(weighted)
        )
  }

  tangents[0]
    = (points[1]!.y - points[0]!.y) / (points[1]!.x - points[0]!.x || 1)
  tangents[count - 1]
    = (points[count - 1]!.y - points[count - 2]!.y)
      / (points[count - 1]!.x - points[count - 2]!.x || 1)

  let path = `M${points[0]!.x.toFixed(1)},${points[0]!.y.toFixed(1)}`

  for (let index = 0; index < count - 1; index++) {
    const current = points[index]!
    const next = points[index + 1]!
    const handle = (next.x - current.x) / 3
    const c1x = current.x + handle
    const c1y = current.y + tangents[index]! * handle
    const c2x = next.x - handle
    const c2y = next.y - tangents[index + 1]! * handle
    path += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${next.x.toFixed(1)},${next.y.toFixed(1)}`
  }

  return path
}

const chart = computed(() => {
  const series = dailySeries.value
  const width = Math.max(260, Math.round(chartWidth.value) || 600)
  const height = CHART_HEIGHT
  const innerWidth = width - CHART_PADDING.left - CHART_PADDING.right
  const innerHeight = height - CHART_PADDING.top - CHART_PADDING.bottom
  const baseline = CHART_PADDING.top + innerHeight

  const peakValue = Math.max(1, ...series.map(day => day.clicks))
  const { step: yStep, intervals: yIntervals } = niceScale(peakValue)
  const yMax = yStep * yIntervals

  const x = (index: number) =>
    series.length <= 1
      ? CHART_PADDING.left + innerWidth / 2
      : CHART_PADDING.left + (index / (series.length - 1)) * innerWidth

  const y = (value: number) =>
    CHART_PADDING.top + (1 - value / yMax) * innerHeight

  const points = series.map((day, index) => ({
    ...day,
    index,
    x: x(index),
    y: y(day.clicks)
  }))

  const line = hasClicks.value ? monotonePath(points) : ''
  const area = line
    ? `${line} L${points.at(-1)!.x.toFixed(1)},${baseline} L${points[0]!.x.toFixed(1)},${baseline} Z`
    : ''

  const yTicks = Array.from({ length: yIntervals + 1 }, (_, index) => ({
    value: index * yStep,
    y: y(index * yStep)
  }))

  const xTickCount = Math.min(5, series.length)
  const xTicks = Array.from({ length: xTickCount }, (_, index) => {
    const pointIndex
      = xTickCount > 1
        ? Math.round((index * (series.length - 1)) / (xTickCount - 1))
        : 0
    const point = points[pointIndex]!
    return { index: pointIndex, x: point.x, label: formatDay(point.date) }
  })

  return {
    width,
    height,
    baseline,
    plotTop: CHART_PADDING.top,
    left: CHART_PADDING.left,
    right: width - CHART_PADDING.right,
    innerWidth,
    points,
    lastPoint: points.at(-1) ?? null,
    line,
    area,
    yTicks,
    xTicks,
    averageY: y(averagePerDay.value)
  }
})

const activeIndex = ref<number | null>(null)

const activePoint = computed(() =>
  activeIndex.value === null
    ? null
    : chart.value.points[activeIndex.value] ?? null
)

const activeShare = computed(() => {
  const point = activePoint.value
  if (!point || !periodTotal.value) return 0
  return Math.round((point.clicks / periodTotal.value) * 100)
})

const tooltipStyle = computed(() => {
  const point = activePoint.value
  if (!point) return {}
  const half = 66
  const left = Math.min(
    Math.max(point.x, half),
    Math.max(chart.value.width - half, half)
  )
  const above = point.y > 68
  return {
    left: `${left}px`,
    top: above ? `${point.y - 14}px` : `${point.y + 16}px`,
    transform: above ? 'translate(-50%, -100%)' : 'translate(-50%, 0)'
  }
})

const updateActivePoint = (event: PointerEvent) => {
  const element = svgEl.value
  const points = chart.value.points
  if (!element || !points.length) return

  const rect = element.getBoundingClientRect()
  if (!rect.width) return

  const position
    = ((event.clientX - rect.left) / rect.width) * chart.value.width
  const ratio
    = (position - chart.value.left) / (chart.value.innerWidth || 1)
  const index = Math.round(ratio * (points.length - 1))
  activeIndex.value = Math.min(Math.max(index, 0), points.length - 1)
}

const clearActivePoint = () => {
  activeIndex.value = null
}

const topLinks = computed(() => (data.value?.links ?? []).slice(0, 8))
const maxLinkClicks = computed(() =>
  Math.max(1, ...topLinks.value.map(link => link.clicks))
)

const countries = computed(() => data.value?.countries ?? [])
const devices = computed(() => data.value?.devices ?? [])
const operatingSystems = computed(() => data.value?.operatingSystems ?? [])
const sources = computed(() => data.value?.sources ?? [])
const browsers = computed(() => data.value?.browsers ?? [])
const cities = computed(() => data.value?.cities ?? [])
const networks = computed(() => data.value?.networks ?? [])

const maxOf = (items: Array<{ clicks: number }>) =>
  Math.max(1, ...items.map(item => item.clicks))

const maxCountryClicks = computed(() => maxOf(countries.value))
const maxDeviceClicks = computed(() => maxOf(devices.value))
const maxOSClicks = computed(() => maxOf(operatingSystems.value))
const maxSourceClicks = computed(() => maxOf(sources.value))
const maxBrowserClicks = computed(() => maxOf(browsers.value))
const maxCityClicks = computed(() => maxOf(cities.value))
const maxNetworkClicks = computed(() => maxOf(networks.value))

const sourceIcon = (kind: 'campaign' | 'referrer' | 'direct') => {
  if (kind === 'campaign') return 'i-ph-megaphone-duotone'
  if (kind === 'referrer') return 'i-ph-arrow-square-out-duotone'
  return 'i-ph-cursor-duotone'
}

const countryFlag = (code: string) =>
  code.length === 2
    ? String.fromCodePoint(
        ...[...code.toUpperCase()].map(
          char => 127397 + char.charCodeAt(0)
        )
      )
    : ''

const deviceIcon = (name: string) => {
  const normalized = name.toLowerCase()
  if (normalized === 'mobile') return 'i-ph-device-mobile-duotone'
  if (normalized === 'tablet') return 'i-ph-device-tablet-duotone'
  return 'i-ph-desktop-duotone'
}

const osIcon = (name: string) => {
  const normalized = name.toLowerCase()
  if (normalized === 'macos') return 'i-ph-apple-logo-duotone'
  if (normalized === 'ios') return 'i-ph-device-mobile-duotone'
  if (normalized === 'android') return 'i-ph-android-logo-duotone'
  if (normalized === 'windows') return 'i-ph-windows-logo-duotone'
  if (normalized === 'linux') return 'i-ph-linux-logo-duotone'
  return 'i-ph-desktop-duotone'
}

const share = (clicks: number) =>
  data.value?.total ? Math.round((clicks / data.value.total) * 100) : 0

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US').format(value)

const stats = computed(() => [
  {
    label: 'Total clicks',
    value: formatNumber(data.value?.total ?? 0),
    icon: 'i-ph-cursor-click-duotone',
    color: 'text-primary-500'
  },
  {
    label: 'Last 7 days',
    value: formatNumber(data.value?.last7Days ?? 0),
    icon: 'i-ph-trend-up-duotone',
    color: 'text-emerald-500'
  },
  {
    label: 'Links tracked',
    value: formatNumber(data.value?.trackedLinks ?? 0),
    icon: 'i-ph-link-duotone',
    color: 'text-sky-500'
  }
])
</script>

<template>
  <ClientOnly>
    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      icon="i-ph-warning-circle-duotone"
      title="Link clicks unreachable"
      description="The short link statistics API returned an error. Check the worker logs for details."
    />

    <div
      v-else-if="pending"
      class="space-y-4"
    >
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <USkeleton
          v-for="i in 3"
          :key="i"
          class="h-20 rounded-lg"
        />
      </div>
      <USkeleton class="h-64 rounded-lg" />
    </div>

    <div
      v-else-if="data"
      class="space-y-4"
    >
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <UCard
          v-for="stat in stats"
          :key="stat.label"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-9 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800"
            >
              <UIcon
                :name="stat.icon"
                :class="[stat.color, 'size-5']"
              />
            </div>
            <div>
              <p
                class="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                {{ stat.label }}
              </p>
              <p
                class="text-lg font-bold text-neutral-900 dark:text-white"
              >
                {{ stat.value }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <UCard class="lg:col-span-3">
          <template #header>
            <HomeLiveCardHeader
              title="Clicks per day"
              title-size="sm"
              icon="i-ph-chart-line-up-duotone"
            >
              <template #right>
                <UBadge
                  color="primary"
                  variant="subtle"
                  size="sm"
                >
                  {{ formatNumber(periodTotal) }} in {{ dailySeries.length }} days
                </UBadge>
              </template>
            </HomeLiveCardHeader>
          </template>

          <div class="text-primary-500">
            <div
              ref="chartEl"
              class="relative"
            >
              <svg
                v-if="chartWidth"
                ref="svgEl"
                :viewBox="`0 0 ${chart.width} ${chart.height}`"
                :style="{ height: `${chart.height}px` }"
                class="block w-full overflow-visible"
                role="img"
                :aria-label="`Daily link clicks over the last ${dailySeries.length} days, ${formatNumber(periodTotal)} clicks in total`"
                @pointermove="updateActivePoint"
                @pointerdown="updateActivePoint"
                @pointerleave="clearActivePoint"
              >
                <defs>
                  <linearGradient
                    :id="areaGradientId"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stop-color="currentColor"
                      stop-opacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stop-color="currentColor"
                      stop-opacity="0"
                    />
                  </linearGradient>
                </defs>

                <g>
                  <line
                    v-for="tick in chart.yTicks"
                    :key="`grid-${tick.value}`"
                    :x1="chart.left"
                    :x2="chart.right"
                    :y1="tick.y"
                    :y2="tick.y"
                    class="stroke-neutral-200 dark:stroke-neutral-800"
                    :stroke-dasharray="tick.value === 0 ? undefined : '3 4'"
                    stroke-width="1"
                    vector-effect="non-scaling-stroke"
                  />
                </g>

                <g>
                  <text
                    v-for="tick in chart.yTicks"
                    :key="`y-label-${tick.value}`"
                    :x="chart.left - 8"
                    :y="tick.y"
                    text-anchor="end"
                    dominant-baseline="middle"
                    font-size="10"
                    class="fill-neutral-400 tabular-nums dark:fill-neutral-500"
                  >
                    {{ formatNumber(tick.value) }}
                  </text>
                </g>

                <line
                  v-if="hasClicks"
                  :x1="chart.left"
                  :x2="chart.right"
                  :y1="chart.averageY"
                  :y2="chart.averageY"
                  class="stroke-neutral-400/70 dark:stroke-neutral-500/70"
                  stroke-width="1"
                  stroke-dasharray="4 4"
                  vector-effect="non-scaling-stroke"
                />

                <path
                  v-if="chart.area"
                  :d="chart.area"
                  :fill="`url(#${areaGradientId})`"
                />
                <path
                  v-if="chart.line"
                  :d="chart.line"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  vector-effect="non-scaling-stroke"
                />

                <circle
                  v-if="chart.lastPoint"
                  :cx="chart.lastPoint.x"
                  :cy="chart.lastPoint.y"
                  r="3"
                  fill="currentColor"
                  class="stroke-white dark:stroke-neutral-900"
                  stroke-width="2"
                />

                <g v-if="activePoint">
                  <line
                    :x1="activePoint.x"
                    :x2="activePoint.x"
                    :y1="chart.plotTop"
                    :y2="chart.baseline"
                    class="stroke-neutral-300 dark:stroke-neutral-600"
                    stroke-width="1"
                    stroke-dasharray="3 3"
                    vector-effect="non-scaling-stroke"
                  />
                  <circle
                    :cx="activePoint.x"
                    :cy="activePoint.y"
                    r="9"
                    fill="currentColor"
                    opacity="0.15"
                  />
                  <circle
                    :cx="activePoint.x"
                    :cy="activePoint.y"
                    r="3.5"
                    fill="currentColor"
                  />
                </g>

                <g>
                  <text
                    v-for="tick in chart.xTicks"
                    :key="`x-label-${tick.index}`"
                    :x="tick.x"
                    :y="chart.height - 6"
                    text-anchor="middle"
                    font-size="10"
                    class="fill-neutral-400 dark:fill-neutral-500"
                  >
                    {{ tick.label }}
                  </text>
                </g>
              </svg>

              <p
                v-if="!hasClicks"
                class="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span
                  class="rounded-full bg-neutral-50/90 px-3 py-1 text-xs text-neutral-500 dark:bg-neutral-900/90 dark:text-neutral-400"
                >
                  No clicks in this period
                </span>
              </p>

              <div
                v-if="activePoint"
                class="pointer-events-none absolute z-10 whitespace-nowrap rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
                :style="tooltipStyle"
              >
                <p
                  class="text-[11px] font-medium text-neutral-500 dark:text-neutral-400"
                >
                  {{ formatDayLong(activePoint.date) }}
                </p>
                <p class="text-xs font-bold text-neutral-900 dark:text-white">
                  {{ formatNumber(activePoint.clicks) }} click{{
                    activePoint.clicks === 1 ? "" : "s"
                  }}
                  <span
                    v-if="activePoint.clicks"
                    class="font-normal text-neutral-400"
                  >· {{ activeShare }}%</span>
                </p>
              </div>
            </div>

            <div
              class="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] text-neutral-400"
            >
              <span class="inline-flex items-center gap-1.5">
                <span
                  class="inline-block w-4 border-t border-dashed border-neutral-400"
                />
                {{ averagePerDay.toFixed(1) }} avg/day
              </span>
              <span v-if="peakDay && peakDay.clicks">
                Peak {{ formatNumber(peakDay.clicks) }} on
                {{ formatDay(peakDay.date) }}
              </span>
            </div>
          </div>
        </UCard>

        <UCard class="lg:col-span-2">
          <template #header>
            <HomeLiveCardHeader
              title="Top links"
              title-size="sm"
              icon="i-ph-trophy-duotone"
              icon-bg="bg-amber-50 dark:bg-amber-900/30 text-amber-500"
            />
          </template>

          <ul
            v-if="topLinks.length"
            class="space-y-3"
          >
            <li
              v-for="link in topLinks"
              :key="link.slug"
            >
              <div class="flex items-center gap-2 text-sm">
                <UIcon
                  :name="link.icon || 'i-ph-link-duotone'"
                  class="size-4 shrink-0 text-neutral-500 dark:text-neutral-400"
                />
                <span
                  class="min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300"
                >
                  {{ link.title }}
                </span>
                <span
                  class="font-medium tabular-nums text-neutral-900 dark:text-white"
                >
                  {{ formatNumber(link.clicks) }}
                </span>
              </div>
              <div
                class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
              >
                <div
                  class="h-full rounded-full bg-amber-500"
                  :style="{
                    width: `${(link.clicks / maxLinkClicks) * 100}%`
                  }"
                />
              </div>
            </li>
          </ul>

          <p
            v-else
            class="text-sm text-neutral-500 dark:text-neutral-400"
          >
            No clicks recorded yet.
          </p>
        </UCard>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UCard>
          <template #header>
            <HomeLiveCardHeader
              title="Countries"
              title-size="sm"
              icon="i-ph-globe-hemisphere-west-duotone"
              icon-bg="bg-sky-50 dark:bg-sky-900/30 text-sky-500"
            />
          </template>

          <ul
            v-if="countries.length"
            class="space-y-3"
          >
            <li
              v-for="country in countries"
              :key="country.code"
            >
              <div class="flex items-center gap-2 text-sm">
                <span
                  class="text-base leading-none"
                  aria-hidden="true"
                >{{ countryFlag(country.code) }}</span>
                <span
                  class="min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300"
                >
                  {{ country.name }}
                </span>
                <span class="text-xs text-neutral-400">{{ share(country.clicks) }}%</span>
                <span
                  class="font-medium tabular-nums text-neutral-900 dark:text-white"
                >
                  {{ formatNumber(country.clicks) }}
                </span>
              </div>
              <div
                class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
              >
                <div
                  class="h-full rounded-full bg-sky-500"
                  :style="{
                    width: `${(country.clicks / maxCountryClicks) * 100}%`
                  }"
                />
              </div>
            </li>
          </ul>

          <p
            v-else
            class="text-sm text-neutral-500 dark:text-neutral-400"
          >
            No location data yet.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <HomeLiveCardHeader
              title="Devices & OS"
              title-size="sm"
              icon="i-ph-devices-duotone"
              icon-bg="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500"
            />
          </template>

          <div
            v-if="devices.length || operatingSystems.length"
            class="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <div>
              <h4
                class="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                Device type
              </h4>
              <ul class="space-y-2.5">
                <li
                  v-for="device in devices"
                  :key="device.name"
                >
                  <div
                    class="flex items-center gap-2 text-sm"
                  >
                    <UIcon
                      :name="deviceIcon(device.name)"
                      class="size-4 shrink-0 text-neutral-500 dark:text-neutral-400"
                    />
                    <span
                      class="min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300"
                    >
                      {{ device.name }}
                    </span>
                    <span class="text-xs text-neutral-400">{{ share(device.clicks) }}%</span>
                    <span
                      class="font-medium tabular-nums text-neutral-900 dark:text-white"
                    >
                      {{ formatNumber(device.clicks) }}
                    </span>
                  </div>
                  <div
                    class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
                  >
                    <div
                      class="h-full rounded-full bg-emerald-500"
                      :style="{
                        width: `${(device.clicks / maxDeviceClicks) * 100}%`
                      }"
                    />
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4
                class="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                Operating system
              </h4>
              <ul class="space-y-2.5">
                <li
                  v-for="os in operatingSystems"
                  :key="os.name"
                >
                  <div
                    class="flex items-center gap-2 text-sm"
                  >
                    <UIcon
                      :name="osIcon(os.name)"
                      class="size-4 shrink-0 text-neutral-500 dark:text-neutral-400"
                    />
                    <span
                      class="min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300"
                    >
                      {{ os.name }}
                    </span>
                    <span class="text-xs text-neutral-400">{{ share(os.clicks) }}%</span>
                    <span
                      class="font-medium tabular-nums text-neutral-900 dark:text-white"
                    >
                      {{ formatNumber(os.clicks) }}
                    </span>
                  </div>
                  <div
                    class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
                  >
                    <div
                      class="h-full rounded-full bg-emerald-500"
                      :style="{
                        width: `${(os.clicks / maxOSClicks) * 100}%`
                      }"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <p
            v-else
            class="text-sm text-neutral-500 dark:text-neutral-400"
          >
            No device data yet.
          </p>
        </UCard>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UCard>
          <template #header>
            <HomeLiveCardHeader
              title="Sources"
              title-size="sm"
              icon="i-ph-share-network-duotone"
              icon-bg="bg-violet-50 dark:bg-violet-900/30 text-violet-500"
            />
          </template>

          <ul
            v-if="sources.length"
            class="space-y-3"
          >
            <li
              v-for="source in sources"
              :key="`${source.kind}:${source.name}`"
            >
              <div class="flex items-center gap-2 text-sm">
                <UIcon
                  :name="sourceIcon(source.kind)"
                  class="size-4 shrink-0 text-neutral-500 dark:text-neutral-400"
                />
                <span
                  class="min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300"
                >
                  {{ source.name }}
                </span>
                <span class="text-xs text-neutral-400">{{ share(source.clicks) }}%</span>
                <span
                  class="font-medium tabular-nums text-neutral-900 dark:text-white"
                >
                  {{ formatNumber(source.clicks) }}
                </span>
              </div>
              <div
                class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
              >
                <div
                  class="h-full rounded-full bg-violet-500"
                  :style="{
                    width: `${(source.clicks / maxSourceClicks) * 100}%`
                  }"
                />
              </div>
            </li>
          </ul>

          <p
            v-else
            class="text-sm text-neutral-500 dark:text-neutral-400"
          >
            No source data yet.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <HomeLiveCardHeader
              title="Browsers"
              title-size="sm"
              icon="i-ph-browser-duotone"
              icon-bg="bg-blue-50 dark:bg-blue-900/30 text-blue-500"
            />
          </template>

          <ul
            v-if="browsers.length"
            class="space-y-3"
          >
            <li
              v-for="browser in browsers"
              :key="browser.name"
            >
              <div class="flex items-center gap-2 text-sm">
                <span
                  class="min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300"
                >
                  {{ browser.name }}
                </span>
                <span class="text-xs text-neutral-400">{{ share(browser.clicks) }}%</span>
                <span
                  class="font-medium tabular-nums text-neutral-900 dark:text-white"
                >
                  {{ formatNumber(browser.clicks) }}
                </span>
              </div>
              <div
                class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
              >
                <div
                  class="h-full rounded-full bg-blue-500"
                  :style="{
                    width: `${(browser.clicks / maxBrowserClicks) * 100}%`
                  }"
                />
              </div>
            </li>
          </ul>

          <p
            v-else
            class="text-sm text-neutral-500 dark:text-neutral-400"
          >
            No browser data yet.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <HomeLiveCardHeader
              title="Cities"
              title-size="sm"
              icon="i-ph-map-pin-duotone"
              icon-bg="bg-orange-50 dark:bg-orange-900/30 text-orange-500"
            />
          </template>

          <ul
            v-if="cities.length"
            class="space-y-3"
          >
            <li
              v-for="city in cities"
              :key="`${city.name}:${city.region}:${city.country}`"
              :title="city.countryName ?? undefined"
            >
              <div class="flex items-center gap-2 text-sm">
                <span
                  v-if="city.country"
                  class="text-base leading-none"
                  aria-hidden="true"
                >{{ countryFlag(city.country) }}</span>
                <span
                  class="min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300"
                >
                  {{ city.name }}
                  <span
                    v-if="city.region"
                    class="text-neutral-400"
                  >· {{ city.region }}</span>
                </span>
                <span class="text-xs text-neutral-400">{{ share(city.clicks) }}%</span>
                <span
                  class="font-medium tabular-nums text-neutral-900 dark:text-white"
                >
                  {{ formatNumber(city.clicks) }}
                </span>
              </div>
              <div
                class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
              >
                <div
                  class="h-full rounded-full bg-orange-500"
                  :style="{
                    width: `${(city.clicks / maxCityClicks) * 100}%`
                  }"
                />
              </div>
            </li>
          </ul>

          <p
            v-else
            class="text-sm text-neutral-500 dark:text-neutral-400"
          >
            No city data yet.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <HomeLiveCardHeader
              title="Networks"
              title-size="sm"
              icon="i-ph-wifi-high-duotone"
              icon-bg="bg-teal-50 dark:bg-teal-900/30 text-teal-500"
            />
          </template>

          <ul
            v-if="networks.length"
            class="space-y-3"
          >
            <li
              v-for="network in networks"
              :key="`${network.name}:${network.asn}`"
            >
              <div class="flex items-center gap-2 text-sm">
                <span
                  class="min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300"
                >
                  {{ network.name }}
                  <span
                    v-if="network.asn"
                    class="text-neutral-400"
                  >· AS{{ network.asn }}</span>
                </span>
                <span class="text-xs text-neutral-400">{{ share(network.clicks) }}%</span>
                <span
                  class="font-medium tabular-nums text-neutral-900 dark:text-white"
                >
                  {{ formatNumber(network.clicks) }}
                </span>
              </div>
              <div
                class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
              >
                <div
                  class="h-full rounded-full bg-teal-500"
                  :style="{
                    width: `${(network.clicks / maxNetworkClicks) * 100}%`
                  }"
                />
              </div>
            </li>
          </ul>

          <p
            v-else
            class="text-sm text-neutral-500 dark:text-neutral-400"
          >
            No network data yet.
          </p>
        </UCard>
      </div>
    </div>
  </ClientOnly>
</template>
