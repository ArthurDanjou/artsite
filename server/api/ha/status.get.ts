export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.ha.url || !config.ha.token) {
    return null
  }

  const headers = { Authorization: `Bearer ${config.ha.token}` }
  const base = config.ha.url

  const [arthur, weather, sun] = await Promise.allSettled([
    $fetch(`${base}/api/states/person.arthur`, { headers }).catch(() => null),
    $fetch(`${base}/api/states/weather.palaiseau`, { headers }).catch(() => null),
    $fetch(`${base}/api/states/sun.sun`, { headers }).catch(() => null)
  ])

  const location = arthur.status === 'fulfilled' && arthur.value
    ? arthur.value.state
    : null

  const weatherData = weather.status === 'fulfilled' && weather.value
    ? {
        condition: weather.value.state,
        temperature: weather.value.attributes?.temperature ?? null
      }
    : null

  const isDay = sun.status === 'fulfilled' && sun.value
    ? sun.value.state === 'above_horizon'
    : null

  return {
    updatedAt: new Date().toISOString(),
    location,
    weather: weatherData,
    isDay
  }
}, {
  maxAge: 60,
  name: 'ha-status'
})
