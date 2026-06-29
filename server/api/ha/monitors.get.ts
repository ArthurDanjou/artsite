export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.ha.url || !config.ha.token) {
    return null
  }

  const headers = { Authorization: `Bearer ${config.ha.token}` }

  interface UptimeKumaAttrs {
    device_class: string
    options: string[]
    friendly_name?: string
  }

  const isUptimeKuma = (attrs: unknown): attrs is UptimeKumaAttrs => {
    if (typeof attrs !== 'object' || attrs === null) return false
    const a = attrs as Record<string, unknown>
    return a.device_class === 'enum'
      && Array.isArray(a.options)
      && a.options.includes('down')
      && a.options.includes('up')
      && a.options.includes('pending')
      && a.options.includes('maintenance')
  }

  const states = await $fetch<Array<{ entity_id: string, state: string, attributes: unknown }>>(
    `${config.ha.url}/api/states`, { headers }
  ).catch(() => [])

  const monitors = states
    .filter(s => s.entity_id.startsWith('sensor.') && s.entity_id.endsWith('_statut'))
    .filter(s => isUptimeKuma(s.attributes))
    .map(s => ({
      service: s.entity_id.replace(/^sensor\./, '').replace(/_statut$/, ''),
      state: s.state,
      friendly_name: (s.attributes as UptimeKumaAttrs).friendly_name ?? s.entity_id
    }))

  const up = monitors.filter(m => m.state === 'up').length
  const down = monitors.filter(m => m.state === 'down' || m.state === 'pending').length
  const maintenance = monitors.filter(m => m.state === 'maintenance').length
  const total = monitors.length
  const operational = up + maintenance

  return {
    updatedAt: new Date().toISOString(),
    total,
    up,
    down,
    maintenance,
    degraded: down,
    uptime: total > 0 ? ((operational / total) * 100).toFixed(1) : '0.0'
  }
}, {
  maxAge: 30,
  name: 'ha-monitors'
})
