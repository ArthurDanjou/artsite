import type { H3Event } from 'h3'
import { getHeader, getRequestURL } from 'h3'
import { SHORT_DOMAINS } from '~~/shared/links'

interface CloudflarePlatformContext {
  request?: { url?: string }
  url?: URL | string
}

function toHostname(value: string | URL | null | undefined): string | null {
  if (!value) return null
  const text = value.toString().trim()
  if (!text) return null

  try {
    return new URL(text.includes('://') ? text : `https://${text}`).hostname.toLowerCase()
  }
  catch {
    return null
  }
}

export function getRequestHostname(event: H3Event): string {
  const context = event.context as {
    _platform?: { cloudflare?: CloudflarePlatformContext }
    cloudflare?: CloudflarePlatformContext
  }

  const candidates = [
    context._platform?.cloudflare?.url,
    context._platform?.cloudflare?.request?.url,
    context.cloudflare?.url,
    context.cloudflare?.request?.url,
    (event as H3Event & { url?: URL }).url,
    event.web?.url,
    getHeader(event, 'x-forwarded-host'),
    getHeader(event, 'host'),
    getRequestURL(event).hostname
  ]
    .map(toHostname)
    .filter((hostname): hostname is string => Boolean(hostname))

  return candidates.find(hostname => (SHORT_DOMAINS as readonly string[]).includes(hostname))
    ?? candidates[0]
    ?? ''
}
