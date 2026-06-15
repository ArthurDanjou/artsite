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

  const [lights, totalLights, weather, holidays] = await Promise.allSettled([
    $fetch<HaState>(`${base}/api/states/sensor.current_lights_on`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/sensor.total_lumieres`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/weather.palaiseau`, { headers }).catch(() => null),
    $fetch<HaState>(`${base}/api/states/todo.vacances_scolaires_france_zone_c`, { headers }).catch(() => null)
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

  const currentLights = lights.status === 'fulfilled' && lights.value
    ? Number.parseInt(lights.value.state, 10) || 0
    : null

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

  return {
    updatedAt: new Date().toISOString(),
    currentLights,
    weather: weatherData,
    isHoliday,
    totalLights: totalLights.status === 'fulfilled' && totalLights.value
      ? Number.parseInt(totalLights.value.state, 10) || null
      : (domains?.light ?? null),
    totalDomains: domains ? Object.keys(domains).length : null,
    totalAutomations: domains?.automation ?? null,
    totalScenes: domains?.scene ?? null,
    totalEntities: domains ? Object.values(domains).reduce((a, b) => a + b, 0) : null
  }
}, {
  maxAge: 120,
  name: 'ha-status'
})
