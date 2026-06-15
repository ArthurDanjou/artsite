interface HaState {
  entity_id: string
  state: string
  attributes?: Record<string, unknown>
}

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.ha.url || !config.ha.token) {
    return null
  }

  const headers = { Authorization: `Bearer ${config.ha.token}` }
  const base = config.ha.url

  const [totalLights, weather, holidays, immichPhotos, immichVideos, lxcContainers, virtualMachines, dnsRequests, dnsBlocked] = await Promise.allSettled([
    $fetch<HaState>(`${base}/api/states/sensor.total_lumieres`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/weather.palaiseau`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/todo.vacances_scolaires_france_zone_c`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/sensor.immich_nombre_de_photos`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/sensor.immich_nombre_de_videos`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/sensor.node_beelink00_containers_running`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/sensor.node_beelink00_virtual_machines_running`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/sensor.adguard_home_requetes_dns`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/sensor.adguard_home_requetes_dns_bloquees`, { headers }).catch(() => null)
  ])

  let domains: Record<string, number> | null = null
  try {
    const states = await $fetch<HaState[]>(`${base}/api/states`, { headers, timeout: 5000 })
    domains = {}
    for (const s of states) {
      const domain = s.entity_id.split('.')[0]
      domains[domain] = (domains[domain] || 0) + 1
    }
  }
  catch {
    // fallback — counts unavailable
  }

  const weatherData = weather.status === 'fulfilled' && weather.value
    ? {
        condition: weather.value.state,
        temperature: (weather.value.attributes?.temperature as number | undefined) ?? null
      }
    : null

  const today = new Date().toISOString().slice(0, 10)
  const isHoliday = holidays.status === 'fulfilled' && holidays.value
    ? ((holidays.value.attributes?.items as Array<Record<string, string>> | undefined) ?? [])
        .some(item => item.due && item.due.slice(0, 10) === today)
    : null

  const photos = immichPhotos.status === 'fulfilled' && immichPhotos.value
    ? Number.parseInt(immichPhotos.value.state, 10) || null
    : null

  const videos = immichVideos.status === 'fulfilled' && immichVideos.value
    ? Number.parseInt(immichVideos.value.state, 10) || null
    : null

  const lxc = lxcContainers.status === 'fulfilled' && lxcContainers.value
    ? Number.parseInt(lxcContainers.value.state, 10) || null
    : null

  const vm = virtualMachines.status === 'fulfilled' && virtualMachines.value
    ? Number.parseInt(virtualMachines.value.state, 10) || null
    : null

  const dnsTotal = dnsRequests.status === 'fulfilled' && dnsRequests.value
    ? Number.parseInt(dnsRequests.value.state, 10) || null
    : null

  const dnsBlockedCount = dnsBlocked.status === 'fulfilled' && dnsBlocked.value
    ? Number.parseInt(dnsBlocked.value.state, 10) || null
    : null

  return {
    updatedAt: new Date().toISOString(),
    weather: weatherData,
    isHoliday,
    totalLights: totalLights.status === 'fulfilled' && totalLights.value
      ? Number.parseInt(totalLights.value.state, 10) || null
      : (domains?.light ?? null),
    totalDomains: domains ? Object.keys(domains).length : null,
    totalAutomations: domains?.automation ?? null,
    totalScenes: domains?.scene ?? null,
    totalEntities: domains ? Object.values(domains).reduce((a, b) => a + b, 0) : null,
    immichPhotos: photos,
    immichVideos: videos,
    lxcContainers: lxc,
    virtualMachines: vm,
    dnsRequests: dnsTotal,
    dnsBlocked: dnsBlockedCount
  }
}, {
  maxAge: 120,
  name: 'ha-status'
})
