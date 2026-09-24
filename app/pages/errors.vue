<script lang="ts" setup>
definePageMeta({ layout: 'errors' })

const route = useRoute()

const statusCode = computed(() => {
  const raw = route.query.code ?? route.query.status
  const parsed = Number.parseInt(Array.isArray(raw) ? raw[0] ?? '' : raw ?? '', 10)
  return parsed >= 400 && parsed <= 599 ? parsed : 503
})

const originHost = computed(() => {
  const raw = route.query.host ?? route.query.service ?? route.query.url ?? route.query.from
  const value = (Array.isArray(raw) ? raw[0] : raw)?.trim()
  if (!value) return null
  try {
    return new URL(value.includes('://') ? value : `https://${value}`).host
  }
  catch {
    return value.slice(0, 80)
  }
})

interface ErrorCopy {
  badge: 'neutral' | 'red' | 'amber' | 'orange'
  icon: string
  title: string
  description: string
}

const copy = computed<ErrorCopy>(() => {
  switch (statusCode.value) {
    case 400:
      return {
        badge: 'amber',
        icon: 'i-ph-warning-duotone',
        title: 'Invalid request',
        description: 'The request sent to the service is invalid. Check the address and try again.'
      }
    case 401:
      return {
        badge: 'orange',
        icon: 'i-ph-lock-key-duotone',
        title: 'Authentication required',
        description: 'This service requires authentication. Sign in and try again.'
      }
    case 403:
      return {
        badge: 'orange',
        icon: 'i-ph-prohibit-duotone',
        title: 'Access denied',
        description: 'Access to this service is denied. If this seems wrong, contact me.'
      }
    case 404:
      return {
        badge: 'neutral',
        icon: 'i-ph-magnifying-glass-duotone',
        title: 'Service not found',
        description: originHost.value
          ? `The ${originHost.value} service does not exist, is no longer exposed, or the address is incorrect.`
          : 'This resource does not exist, is no longer exposed, or the address is incorrect.'
      }
    case 408:
      return {
        badge: 'amber',
        icon: 'i-ph-timer-duotone',
        title: 'Request timed out',
        description: 'The service took too long to receive your request. Try again in a few moments.'
      }
    case 429:
      return {
        badge: 'amber',
        icon: 'i-ph-traffic-sign-duotone',
        title: 'Too many requests',
        description: 'You have sent too many requests in a short time. Wait a moment before trying again.'
      }
    case 500:
      return {
        badge: 'red',
        icon: 'i-ph-bug-duotone',
        title: 'Internal error',
        description: 'An internal error occurred on the service side. Try again in a few moments.'
      }
    case 502:
      return {
        badge: 'red',
        icon: 'i-ph-plugs-duotone',
        title: 'Bad gateway',
        description: 'The service is not responding or is restarting. Try again in a few moments.'
      }
    case 503:
      return {
        badge: 'red',
        icon: 'i-ph-wrench-duotone',
        title: 'Service unavailable',
        description: 'The service is temporarily unavailable or under maintenance. Try again in a few minutes.'
      }
    case 504:
      return {
        badge: 'red',
        icon: 'i-ph-hourglass-duotone',
        title: 'Gateway timeout',
        description: 'The service is taking too long to respond. Try again in a few moments.'
      }
    default:
      return statusCode.value < 500
        ? {
            badge: 'amber',
            icon: 'i-ph-warning-duotone',
            title: 'Request failed',
            description: 'The request could not be processed. Check the address and try again.'
          }
        : {
            badge: 'red',
            icon: 'i-ph-cloud-warning-duotone',
            title: 'Service error',
            description: 'The service is experiencing a temporary issue. Try again in a few moments.'
          }
  }
})

useSeoMeta({
  title: () => `Error ${statusCode.value} — ${copy.value.title}`,
  description: () => copy.value.description,
  robots: 'noindex, nofollow'
})

// Always respond 200 with the error content inside: the Traefik errors
// middleware replays the original status itself, and a non-2xx from the
// error service can break the fallback chain.
const requestEvent = useRequestEvent()
if (requestEvent) {
  setResponseStatus(requestEvent, 200)
}

interface StatusPageSummary {
  source: string
  updatedAt: string
  total: number
  up: number
  down: number
  maintenance: number
  uptime: number
  incident: { title: string, style?: string | null } | null
  maintenanceActive: { title: string } | null
}

const { data: monitors, status: monitorsStatus, refresh: refreshMonitors } = useFetch<StatusPageSummary | null>('/api/status-page', {
  lazy: true
})
useLiveRefresh(refreshMonitors, 30_000)

const monitorsLoading = computed(() => monitorsStatus.value === 'pending' || monitorsStatus.value === 'idle')
const hasMonitors = computed(() => !!monitors.value && monitors.value.total > 0)

const infraState = computed<{ dot: 'emerald' | 'red' | 'sky' | 'neutral', label: string }>(() => {
  if (!hasMonitors.value) return { dot: 'neutral', label: 'Unknown status' }
  if ((monitors.value?.down ?? 0) > 0) {
    const down = monitors.value?.down ?? 0
    return { dot: 'red', label: `${down} service${down > 1 ? 's' : ''} down` }
  }
  if ((monitors.value?.maintenance ?? 0) > 0) return { dot: 'sky', label: 'Maintenance in progress' }
  return { dot: 'emerald', label: 'All systems operational' }
})

const updatedAtLabel = computed(() => {
  if (!hasMonitors.value) return null
  const raw = monitors.value?.updatedAt
  if (!raw) return null
  return new Date(raw).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
})

const currentYear = new Date().getFullYear()

const isErrorsHost = useIsErrorsHost()

// Real Traefik flow: the browser URL is already the service URL, so a plain
// reload retries the service through Traefik. Only when visiting the errors
// domain directly with a known service host is it better to navigate back
// to the service root.
const retryTarget = computed(() => {
  if (originHost.value && isErrorsHost.value) return `https://${originHost.value}`
  return null
})

function retry() {
  if (retryTarget.value) window.location.href = retryTarget.value
  else window.location.reload()
}
</script>

<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center py-16">
    <div class="mb-10 flex w-full items-center justify-between">
      <a
        href="https://arthurdanjou.fr"
        class="handwriting text-xl sm:text-2xl text-nowrap font-bold duration-300 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        Arthur Danjou
      </a>
      <ThemeSwitcher />
    </div>

    <p class="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
      errors.arthurdanjou.fr
    </p>
    <h1 class="text-center font-serif text-[7rem] md:text-[10rem] italic leading-none">
      {{ statusCode }}
    </h1>

    <UBadge
      :color="copy.badge"
      :icon="copy.icon"
      variant="soft"
      size="lg"
      class="mt-4"
    >
      {{ copy.title }}
    </UBadge>

    <p class="mt-6 max-w-md text-center text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
      {{ copy.description }}
    </p>
    <p
      v-if="originHost"
      class="mt-3 max-w-full truncate font-mono text-xs text-neutral-400 dark:text-neutral-500"
    >
      Requested service: {{ originHost }}
    </p>

    <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
      <UButton
        icon="i-ph-arrow-clockwise-duotone"
        color="neutral"
        @click="retry"
      >
        Retry
      </UButton>
      <UButton
        to="https://arthurdanjou.fr"
        icon="i-ph-house-duotone"
        color="neutral"
        variant="soft"
      >
        Back to home
      </UButton>
      <UButton
        to="https://go.arthurdanjou.fr/status"
        target="_blank"
        icon="i-ph-heartbeat-duotone"
        color="neutral"
        variant="ghost"
      >
        Status
      </UButton>
    </div>

    <UAlert
      v-if="monitors?.incident"
      color="red"
      variant="soft"
      icon="i-ph-warning-duotone"
      :title="monitors.incident.title"
      description="Ongoing infrastructure incident. Follow its progress on the status page."
      class="mt-8 w-full max-w-xl"
    />
    <UAlert
      v-else-if="monitors?.maintenanceActive"
      color="sky"
      variant="soft"
      icon="i-ph-wrench-duotone"
      :title="monitors.maintenanceActive.title"
      class="mt-8 w-full max-w-xl"
    />

    <UCard class="mt-12 w-full max-w-xl">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold">
            Infrastructure status
          </p>
          <div class="flex items-center gap-2">
            <USkeleton
              v-if="monitorsLoading"
              class="h-2.5 w-2.5 rounded-full"
            />
            <HomeLiveStatusDot
              v-else
              :color="infraState.dot"
              size="sm"
            />
            <span
              v-if="!monitorsLoading"
              class="font-mono text-xs font-medium text-neutral-500 dark:text-neutral-400"
            >
              {{ infraState.label }}
            </span>
            <USkeleton
              v-else
              class="h-4 w-24"
            />
          </div>
        </div>
      </template>

      <div v-if="monitorsLoading">
        <USkeleton class="h-24 w-full rounded-lg" />
      </div>

      <div v-else-if="hasMonitors">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p class="font-mono text-xl font-bold">
              {{ monitors?.total }}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              Monitored
            </p>
          </div>
          <div>
            <p class="font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {{ monitors?.up }}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              Online
            </p>
          </div>
          <div>
            <p class="font-mono text-xl font-bold text-red-600 dark:text-red-400">
              {{ monitors?.down }}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              Down
            </p>
          </div>
          <div>
            <p class="font-mono text-xl font-bold text-sky-600 dark:text-sky-400">
              {{ monitors?.maintenance }}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              Maintenance
            </p>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between text-xs">
          <span class="text-neutral-500 dark:text-neutral-400">Uptime (24 h)</span>
          <span class="font-mono font-bold">{{ (monitors?.uptime ?? 0).toFixed(1) }}%</span>
        </div>
        <UProgress
          :model-value="monitors?.uptime ?? 0"
          :color="infraState.dot === 'emerald' ? 'emerald' : infraState.dot === 'red' ? 'red' : infraState.dot === 'sky' ? 'sky' : 'neutral'"
          size="sm"
          class="mt-2"
        />
      </div>

      <UAlert
        v-else
        color="neutral"
        variant="soft"
        icon="i-ph-info-duotone"
        title="Status data unavailable"
        description="Monitoring is not responding right now. Check the status page for details."
      />

      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span v-if="updatedAtLabel">Updated {{ updatedAtLabel }}</span>
          <span v-else>Auto-refresh</span>
          <UButton
            to="https://go.arthurdanjou.fr/status"
            target="_blank"
            variant="link"
            color="neutral"
            size="xs"
            icon="i-ph-arrow-square-out-duotone"
          >
            status.arthurdanjou.fr
          </UButton>
        </div>
      </template>
    </UCard>

    <p class="mt-12 text-center text-xs text-neutral-400 dark:text-neutral-500">
      © {{ currentYear }} Arthur Danjou • Persistent error? Contact me via arthurdanjou.fr
    </p>
  </div>
</template>
