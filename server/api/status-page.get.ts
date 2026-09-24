import type { StatusMaintenance, StatusPageData } from '../../types/status'

// Public Uptime Kuma status page. No secret required and independent from
// Home Assistant, so the error page stays informative even when HA is down.
const STATUS_PAGE_BASE = 'https://status.arthurdanjou.fr'
const STATUS_PAGE_SLUG = 'homelab'

interface HeartbeatEntry {
  status: number
  time: string
  msg?: string
  ping?: number | null
}

interface HeartbeatResponse {
  heartbeatList: Record<string, HeartbeatEntry[]>
  uptimeList: Record<string, number>
}

interface StatusIncident {
  id: number
  title: string
  content?: string | null
  style?: string | null
  active?: boolean | number | null
}

// Uptime Kuma monitor statuses: 0 = down, 1 = up, 2 = pending, 3 = maintenance.
function lastStatus(list: HeartbeatEntry[] | undefined): number | null {
  if (!list || list.length === 0) return null
  return list[list.length - 1]?.status ?? null
}

export default defineCachedEventHandler(async (event) => {
  const [page, beats] = await Promise.all([
    $fetch<StatusPageData>(`${STATUS_PAGE_BASE}/api/status-page/${STATUS_PAGE_SLUG}`, { timeout: 8000 }).catch(() => null),
    $fetch<HeartbeatResponse>(`${STATUS_PAGE_BASE}/api/status-page/heartbeat/${STATUS_PAGE_SLUG}`, { timeout: 8000 }).catch(() => null)
  ])

  if (page && beats) {
    let up = 0
    let down = 0
    let maintenance = 0
    const uptimes: number[] = []

    for (const group of page.publicGroupList ?? []) {
      for (const monitor of group.monitorList ?? []) {
        const status = lastStatus(beats.heartbeatList[String(monitor.id)])
        if (status === null) continue
        if (status === 1) up++
        else if (status === 3) maintenance++
        else down++

        const ratio = beats.uptimeList[`${monitor.id}_24`]
        if (typeof ratio === 'number' && Number.isFinite(ratio)) uptimes.push(ratio * 100)
      }
    }

    const total = up + down + maintenance
    if (total > 0) {
      const incidents = ((page as unknown as { incidents?: StatusIncident[] }).incidents ?? [])
        .filter(i => i.active === true || i.active === 1)
      const activeMaintenance = (page.maintenanceList ?? []).filter((m: StatusMaintenance) => m.active)

      return {
        source: 'status-page',
        updatedAt: new Date().toISOString(),
        total,
        up,
        down,
        maintenance,
        uptime: uptimes.length > 0 ? uptimes.reduce((a, b) => a + b, 0) / uptimes.length : 0,
        incident: incidents.length > 0
          ? { title: incidents[0]?.title ?? 'Ongoing incident', style: incidents[0]?.style ?? null }
          : null,
        maintenanceActive: activeMaintenance.length > 0
          ? { title: activeMaintenance[0]?.title ?? 'Ongoing maintenance' }
          : null
      }
    }
  }

  // Fallback on the Home Assistant monitors when the status page is unreachable.
  const ha = await event.$fetch('/api/ha/monitors').catch(() => null) as {
    updatedAt: string
    total: number
    up: number
    down: number
    maintenance: number
    uptime: number
  } | null
  if (!ha || ha.total === 0) return null

  return {
    source: 'ha',
    updatedAt: ha.updatedAt,
    total: ha.total,
    up: ha.up,
    down: ha.down,
    maintenance: ha.maintenance,
    uptime: ha.uptime,
    incident: null,
    maintenanceActive: null
  }
}, {
  maxAge: 60,
  name: 'status-page'
})
