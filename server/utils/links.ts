import type { H3Event } from 'h3'
import { and, asc, eq, sql } from 'drizzle-orm'
import { db, schema } from 'hub:db'
import type { AdminLink, LinkGroup, PublicLink, PublicLinksResponse } from '~~/types/links'
import { categoryRank } from '~~/shared/links'

export type LinkRow = typeof schema.links.$inferSelect

export function serializeAdminLink(row: LinkRow): AdminLink {
  return {
    id: row.id,
    slug: row.slug,
    url: row.url,
    title: row.title,
    label: row.label,
    description: row.description,
    icon: row.icon,
    category: row.category,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: row.featured,
    listed: row.listed,
    archived: row.archived,
    position: row.position,
    clicks: row.clicks,
    dubId: row.dubId,
    lastClickedAt: row.lastClickedAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString()
  }
}

export function serializePublicLink(row: LinkRow): PublicLink {
  return {
    slug: row.slug,
    title: row.title,
    label: row.label,
    description: row.description,
    icon: row.icon,
    category: row.category,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: row.featured
  }
}

export async function getPublicLinks(): Promise<PublicLinksResponse> {
  const rows = await db
    .select()
    .from(schema.links)
    .where(and(eq(schema.links.listed, true), eq(schema.links.archived, false)))
    .orderBy(asc(schema.links.position), asc(schema.links.title))

  const links = rows.map(serializePublicLink)
  const socials = links.filter(link => link.category === 'Social')

  const groups = new Map<string, PublicLink[]>()
  for (const link of links) {
    if (link.category === 'Social') continue
    const group = groups.get(link.category) ?? []
    group.push(link)
    groups.set(link.category, group)
  }

  return {
    socials,
    groups: [...groups.entries()]
      .sort(([left], [right]) => categoryRank(left) - categoryRank(right) || left.localeCompare(right))
      .map(([label, groupLinks]): LinkGroup => ({ label, links: groupLinks }))
  }
}

export async function findActiveLinkBySlug(slug: string): Promise<LinkRow | null> {
  const [link] = await db
    .select()
    .from(schema.links)
    .where(and(eq(schema.links.slug, slug), eq(schema.links.archived, false)))
    .limit(1)

  return link ?? null
}

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

export async function trackLinkClick(event: H3Event, link: LinkRow): Promise<void> {
  const userAgent = getHeader(event, 'user-agent') ?? null
  if (userAgent && BOT_PATTERN.test(userAgent)) return

  const cf = getCloudflareRequestCf(event)
  const referrer = truncate(getHeader(event, 'referer'), 512)
  const { device, browser, os } = parseUserAgent(userAgent)
  const now = new Date()

  try {
    await db.batch([
      db.insert(schema.linkClicks).values({
        linkId: link.id,
        slug: link.slug,
        timestamp: now,
        country: truncate(cf?.country, 8),
        region: truncate(cf?.region, 120),
        city: truncate(cf?.city, 120),
        referrer,
        userAgent: truncate(userAgent, 512),
        device,
        browser,
        os
      }),
      db
        .update(schema.links)
        .set({
          clicks: sql`${schema.links.clicks} + 1`,
          lastClickedAt: now
        })
        .where(eq(schema.links.id, link.id))
    ])
  }
  catch (error) {
    console.error('[links] Failed to track click', error)
  }
}
