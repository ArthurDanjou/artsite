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

const chart = computed(() => {
  const width = 600
  const height = 160
  const paddingX = 4
  const paddingY = 12
  const values = data.value?.daily ?? []

  const max = Math.max(1, ...values.map(day => day.clicks))
  const step
    = values.length > 1 ? (width - paddingX * 2) / (values.length - 1) : 0

  const points = values.map((day, index) => ({
    ...day,
    x: paddingX + index * step,
    y: paddingY + (1 - day.clicks / max) * (height - paddingY * 2)
  }))

  const line = points
    .map(
      (point, index) =>
        `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`
    )
    .join(' ')

  const area = points.length
    ? `${line} L${points.at(-1)!.x.toFixed(1)},${height} L${points[0]!.x.toFixed(1)},${height} Z`
    : ''

  return {
    width,
    height,
    max,
    line,
    area,
    points,
    start: values.at(0)?.date,
    end: values.at(-1)?.date
  }
})

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

const formatDay = (date?: string) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      })
    : ''

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
            />
          </template>

          <div class="relative text-primary-500">
            <svg
              :viewBox="`0 0 ${chart.width} ${chart.height}`"
              preserveAspectRatio="none"
              class="h-44 w-full overflow-visible"
              role="img"
              aria-label="Daily link clicks over the last 30 days"
            >
              <defs>
                <linearGradient
                  id="link-clicks-area"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="currentColor"
                    stop-opacity="0.35"
                  />
                  <stop
                    offset="100%"
                    stop-color="currentColor"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                :d="chart.area"
                fill="url(#link-clicks-area)"
              />
              <path
                :d="chart.line"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                vector-effect="non-scaling-stroke"
              />
              <circle
                v-for="point in chart.points"
                :key="point.date"
                :cx="point.x"
                :cy="point.y"
                r="4"
                fill="transparent"
                class="hover:fill-current"
              >
                <title>
                  {{ formatDay(point.date) }}:
                  {{ point.clicks }} click{{
                    point.clicks === 1 ? "" : "s"
                  }}
                </title>
              </circle>
            </svg>

            <div
              class="mt-2 flex justify-between text-xs text-neutral-400"
            >
              <span>{{ formatDay(chart.start) }}</span>
              <span>{{ chart.max }} max</span>
              <span>{{ formatDay(chart.end) }}</span>
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
                  class="h-full rounded-full bg-primary-500"
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
