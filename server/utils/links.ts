import type { H3Event } from 'h3'
import { getHeader } from 'h3'
import { db, schema } from 'hub:db'

const BOT_PATTERN = /bot|crawler|spider|preview|slack|discord|twitterbot|facebookexternalhit|linkedinbot|whatsapp|telegram|pinterest|embedly|quora link preview|outbrain|vkshare/i

function truncate(value: string | null | undefined, maxLength: number): string | null {
  if (!value) return null
  return value.length > maxLength ? value.slice(0, maxLength) : value
}

interface CloudflareRequestCf {
  country?: string
  region?: string
  city?: string
}

function getCloudflareRequestCf(event: H3Event): CloudflareRequestCf | null {
  const context = event.context as Record<string, unknown>
  const platform = context._platform as { cloudflare?: { request?: { cf?: CloudflareRequestCf } } } | undefined
  const cloudflare = context.cloudflare as { request?: { cf?: CloudflareRequestCf } } | undefined
  const nodeRequest = event.node?.req as { cf?: CloudflareRequestCf } | undefined

  return platform?.cloudflare?.request?.cf ?? cloudflare?.request?.cf ?? nodeRequest?.cf ?? null
}

export function parseUserAgent(userAgent: string | null): {
  device: string
  browser: string
  os: string
} {
  const ua = userAgent ?? ''

  let device = 'Desktop'
  if (/iPad|Tablet/i.test(ua)) device = 'Tablet'
  else if (/Mobi|Android|iPhone|iPod/i.test(ua)) device = 'Mobile'

  let browser = 'Other'
  if (/Edg\//i.test(ua)) browser = 'Edge'
  else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = 'Opera'
  else if (/Firefox\//i.test(ua)) browser = 'Firefox'
  else if (/Chrome\//i.test(ua) || /CriOS\//i.test(ua)) browser = 'Chrome'
  else if (/Safari\//i.test(ua)) browser = 'Safari'

  let os = 'Other'
  if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'
  else if (/Android/i.test(ua)) os = 'Android'
  else if (/Mac OS X|Macintosh/i.test(ua)) os = 'macOS'
  else if (/Windows/i.test(ua)) os = 'Windows'
  else if (/Linux/i.test(ua)) os = 'Linux'

  return { device, browser, os }
}

export async function trackLinkClick(event: H3Event, slug: string): Promise<void> {
  const userAgent = getHeader(event, 'user-agent') ?? null
  if (userAgent && BOT_PATTERN.test(userAgent)) return

  const cf = getCloudflareRequestCf(event)
  const referrer = truncate(getHeader(event, 'referer'), 512)
  const { device, browser, os } = parseUserAgent(userAgent)

  try {
    await db.insert(schema.linkClicks).values({
      slug,
      timestamp: new Date(),
      country: truncate(cf?.country, 8),
      region: truncate(cf?.region, 120),
      city: truncate(cf?.city, 120),
      referrer,
      userAgent: truncate(userAgent, 512),
      device,
      browser,
      os
    })
  }
  catch (error) {
    console.error('[links] Failed to track click', error)
  }
}
