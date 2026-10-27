import { and, asc, desc, eq, gte, sql } from 'drizzle-orm'
import { db, schema } from 'hub:db'
import { assertLinksAdmin } from '../../../utils/links-admin'
import { serializeAdminLink } from '../../../utils/links'

export default defineEventHandler(async (event) => {
  assertLinksAdmin(event)

  const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [rows, [totals], [recent], [topLink]] = await Promise.all([
    db
      .select()
      .from(schema.links)
      .orderBy(
        asc(schema.links.archived),
        asc(schema.links.category),
        asc(schema.links.position),
        asc(schema.links.title)
      ),
    db
      .select({
        totalLinks: sql<number>`count(*)`,
        totalClicks: sql<number>`coalesce(sum(${schema.links.clicks}), 0)`
      })
      .from(schema.links),
    db
      .select({ count: sql<number>`count(*)` })
      .from(schema.linkClicks)
      .where(gte(schema.linkClicks.timestamp, start)),
    db
      .select({
        title: schema.links.title,
        slug: schema.links.slug,
        clicks: schema.links.clicks
      })
      .from(schema.links)
      .where(and(eq(schema.links.archived, false), eq(schema.links.listed, true)))
      .orderBy(desc(schema.links.clicks))
      .limit(1)
  ])

  return {
    links: rows.map(serializeAdminLink),
    summary: {
      totalLinks: totals?.totalLinks ?? 0,
      totalClicks: totals?.totalClicks ?? 0,
      clicks7d: recent?.count ?? 0,
      topLink: topLink ?? null
    }
  }
})
