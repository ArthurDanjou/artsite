import { and, eq, gte } from 'drizzle-orm'
import { db, schema } from 'hub:db'
import type { StatsBucket } from '~~/types/links'
import { assertLinksAdmin } from '../../../../utils/links-admin'
import { serializeAdminLink } from '../../../../utils/links'

function bucketize(values: Array<string | null>, fallback: string): StatsBucket[] {
  const counts = new Map<string, number>()
  for (const value of values) {
    const key = value?.trim() || fallback
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((left, right) => right.count - left.count || left.value.localeCompare(right.value))
    .slice(0, 8)
}

function referrerLabel(value: string | null): string {
  if (!value) return 'Direct'
  try {
    return new URL(value).hostname.replace(/^www\./, '')
  }
  catch {
    return 'Other'
  }
}

export default defineEventHandler(async (event) => {
  assertLinksAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing link id.' })
  }

  const rawDays = Number(getQuery(event).days)
  const days = Number.isFinite(rawDays) ? Math.min(90, Math.max(7, Math.trunc(rawDays))) : 30

  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.id, id))
    .limit(1)

  if (!link) {
    throw createError({ statusCode: 404, statusMessage: 'Link not found.' })
  }

  const since = new Date()
  since.setHours(0, 0, 0, 0)
  since.setDate(since.getDate() - (days - 1))

  const clicks = await db
    .select({
      timestamp: schema.linkClicks.timestamp,
      country: schema.linkClicks.country,
      referrer: schema.linkClicks.referrer,
      device: schema.linkClicks.device
    })
    .from(schema.linkClicks)
    .where(and(eq(schema.linkClicks.linkId, id), gte(schema.linkClicks.timestamp, since)))

  const daily = Array.from({ length: days }, (_, index) => {
    const date = new Date(since.getTime() + index * 24 * 60 * 60 * 1000)
    return { date: date.toISOString().slice(0, 10), count: 0 }
  })
  const dailyByDate = new Map(daily.map(entry => [entry.date, entry]))

  for (const click of clicks) {
    const entry = dailyByDate.get(click.timestamp.toISOString().slice(0, 10))
    if (entry) entry.count += 1
  }

  return {
    link: serializeAdminLink(link),
    trackedClicks: clicks.length,
    daily,
    countries: bucketize(clicks.map(click => click.country), 'Unknown'),
    referrers: bucketize(clicks.map(click => referrerLabel(click.referrer)), 'Direct'),
    devices: bucketize(clicks.map(click => click.device), 'Unknown')
  }
})
