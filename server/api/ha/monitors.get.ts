export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.ha.url || !config.ha.token) {
    return null
  }

  const headers = { Authorization: `Bearer ${config.ha.token}` }

  const entityIds = [
    'adguard_home', 'artspeed_speedtest_tracker_ui', 'bazarr',
    'bentopdf', 'data', 'dns_server', 'docker_server',
    'flaresolverr', 'garage_stockage_s3', 'garage_webui',
    'homeassistant', 'immich_kiosk', 'immich_server',
    'jellyfin', 'jellyseerr', 'media_server', 'media',
    'nas_server', 'portainer', 'portfolio', 'prowlarr',
    'proxmox_backup_server', 'proxmox_host', 'qbittorrent',
    'radarr', 'servers', 'sonarr', 'storage',
    'traefik_proxy', 'vault', 'web', 'wizarr'
  ]

  const results = await Promise.allSettled(
    entityIds.map(id =>
      $fetch(`${config.ha.url}/api/states/sensor.${id}_statut`, { headers })
        .then(r => ({
          service: id,
          state: r.state,
          friendly_name: r.attributes?.friendly_name ?? id
        }))
        .catch(() => null)
    )
  )

  const monitors = []
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value) {
      monitors.push(r.value)
    }
  }

  const up = monitors.filter(m => m.state === 'up').length
  const total = monitors.length

  return {
    updatedAt: new Date().toISOString(),
    total,
    up,
    down: total - up,
    uptime: total > 0 ? ((up / total) * 100).toFixed(1) : '0.0'
  }
}, {
  maxAge: 120,
  name: 'ha-monitors'
})
