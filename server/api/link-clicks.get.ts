import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { count, gte, isNotNull, sql } from 'drizzle-orm'
import { db, schema } from 'hub:db'

const DAY_MS = 24 * 60 * 60 * 1000
const WINDOW_DAYS = 30

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

function countryName(code: string): string {
  try {
    return regionNames.of(code) ?? code
  }
  catch {
    return code
  }
}

function toDayKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

const SOURCE_PARAMS = ['utm_source', 'ref', 'source', 'src'] as const

function resolveSource(referrer: string | null, query: string | null): { name: string, kind: 'campaign' | 'referrer' | 'direct' } {
  if (query) {
    const params = new URLSearchParams(query)
    for (const key of SOURCE_PARAMS) {
      const value = params.get(key)?.trim()
      if (value) return { name: value.slice(0, 40), kind: 'campaign' }
    }
  }

  if (referrer) {
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, '')
      if (host) return { name: host, kind: 'referrer' }
    }
    catch {
      // Ignore malformed referrers and fall through to direct traffic.
    }
  }

  return { name: 'Direct', kind: 'direct' }
}

async function linkMetadata(event: H3Event): Promise<Map<string, { title: string, icon: string | null, category: string }>> {
  const links = await queryCollection(event, 'links').all()
  return new Map(links.map(link => [link.slug, {
    title: link.title,
    icon: link.icon ?? null,
    category: link.category
  }]))
}

export default defineEventHandler(async (event) => {
  const since = new Date(Date.now() - (WINDOW_DAYS - 1) * DAY_MS)
  since.setUTCHours(0, 0, 0, 0)

  const [bySlug, byDay, byCountry, byDevice, byOS, bySource, byBrowser, byCity, byNetwork, metadata] = await Promise.all([
    db
      .select({
        slug: schema.linkClicks.slug,
        clicks: count()
      })
      .from(schema.linkClicks)
      .groupBy(schema.linkClicks.slug)
      .orderBy(sql`count(*) desc`),
    db
      .select({
        date: sql<string>`strftime('%Y-%m-%d', ${schema.linkClicks.timestamp} / 1000, 'unixepoch')`,
        clicks: count()
      })
      .from(schema.linkClicks)
      .where(gte(schema.linkClicks.timestamp, since))
      .groupBy(sql`strftime('%Y-%m-%d', ${schema.linkClicks.timestamp} / 1000, 'unixepoch')`)
      .orderBy(sql`1 asc`),
    db
      .select({
        code: schema.linkClicks.country,
        clicks: count()
      })
      .from(schema.linkClicks)
      .where(isNotNull(schema.linkClicks.country))
      .groupBy(schema.linkClicks.country)
      .orderBy(sql`count(*) desc`)
      .limit(10),
    db
      .select({
        name: schema.linkClicks.device,
        clicks: count()
      })
      .from(schema.linkClicks)
      .groupBy(schema.linkClicks.device)
      .orderBy(sql`count(*) desc`),
    db
      .select({
        name: schema.linkClicks.os,
        clicks: count()
      })
      .from(schema.linkClicks)
      .groupBy(schema.linkClicks.os)
      .orderBy(sql`count(*) desc`),
    db
      .select({
        referrer: schema.linkClicks.referrer,
        query: schema.linkClicks.query,
        clicks: count()
      })
      .from(schema.linkClicks)
      .groupBy(schema.linkClicks.referrer, schema.linkClicks.query)
      .orderBy(sql`count(*) desc`)
      .limit(500),
    db
      .select({
        name: schema.linkClicks.browser,
        clicks: count()
      })
      .from(schema.linkClicks)
      .groupBy(schema.linkClicks.browser)
      .orderBy(sql`count(*) desc`),
    db
      .select({
        city: schema.linkClicks.city,
        region: schema.linkClicks.region,
        country: schema.linkClicks.country,
        clicks: count()
      })
      .from(schema.linkClicks)
      .where(isNotNull(schema.linkClicks.city))
      .groupBy(schema.linkClicks.city, schema.linkClicks.region, schema.linkClicks.country)
      .orderBy(sql`count(*) desc`)
      .limit(10),
    db
      .select({
        name: schema.linkClicks.asOrganization,
        asn: schema.linkClicks.asn,
        clicks: count()
      })
      .from(schema.linkClicks)
      .where(isNotNull(schema.linkClicks.asOrganization))
      .groupBy(schema.linkClicks.asOrganization, schema.linkClicks.asn)
      .orderBy(sql`count(*) desc`)
      .limit(8),
    linkMetadata(event)
  ])

  const countries = byCountry
    .filter(row => row.code)
    .map(row => ({
      code: row.code as string,
      name: countryName(row.code as string),
      clicks: Number(row.clicks)
    }))

  const devices = byDevice.map(row => ({
    name: row.name ?? 'Unknown',
    clicks: Number(row.clicks)
  }))

  const operatingSystems = byOS.map(row => ({
    name: row.name ?? 'Unknown',
    clicks: Number(row.clicks)
  }))

  const sourceMap = new Map<string, { name: string, kind: 'campaign' | 'referrer' | 'direct', clicks: number }>()
  for (const row of bySource) {
    const source = resolveSource(row.referrer, row.query)
    const key = `${source.kind}:${source.name}`
    const existing = sourceMap.get(key)
    if (existing) existing.clicks += Number(row.clicks)
    else sourceMap.set(key, { ...source, clicks: Number(row.clicks) })
  }
  const sources = [...sourceMap.values()]
    .sort((left, right) => right.clicks - left.clicks)
    .slice(0, 8)

  const browsers = byBrowser.map(row => ({
    name: row.name ?? 'Unknown',
    clicks: Number(row.clicks)
  }))

  const cities = byCity
    .filter(row => row.city)
    .map(row => ({
      name: row.city as string,
      region: row.region ?? null,
      country: row.country ?? null,
      countryName: row.country ? countryName(row.country) : null,
      clicks: Number(row.clicks)
    }))

  const networks = byNetwork
    .filter(row => row.name)
    .map(row => ({
      name: row.name as string,
      asn: row.asn ?? null,
      clicks: Number(row.clicks)
    }))

  const dailyCounts = new Map(byDay.map(row => [row.date, Number(row.clicks)]))
  const daily = Array.from({ length: WINDOW_DAYS }, (_, index) => {
    const date = toDayKey(new Date(since.getTime() + index * DAY_MS))
    return { date, clicks: dailyCounts.get(date) ?? 0 }
  })

  const links = bySlug.map(row => ({
    slug: row.slug,
    clicks: Number(row.clicks),
    title: metadata.get(row.slug)?.title ?? row.slug,
    icon: metadata.get(row.slug)?.icon ?? null,
    category: metadata.get(row.slug)?.category ?? 'Unknown'
  }))

  const total = links.reduce((sum, link) => sum + link.clicks, 0)
  const last7Days = daily.slice(-7).reduce((sum, day) => sum + day.clicks, 0)

  return {
    total,
    last7Days,
    trackedLinks: links.length,
    links,
    daily,
    countries,
    devices,
    operatingSystems,
    sources,
    browsers,
    cities,
    networks
  }
})
