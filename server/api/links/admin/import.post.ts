import { eq } from 'drizzle-orm'
import { db, schema } from 'hub:db'
import { assertLinksAdmin } from '../../../utils/links-admin'
import { humanizeSlug, parseDubCsv } from '../../../utils/dub-import'

export default defineEventHandler(async (event) => {
  assertLinksAdmin(event)

  const body = await readBody<{ csv?: unknown }>(event)
  const csv = typeof body?.csv === 'string' ? body.csv : ''
  if (!csv.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Paste a Dub CSV export first.' })
  }
  if (csv.length > 1_000_000) {
    throw createError({ statusCode: 413, statusMessage: 'The CSV export is too large.' })
  }

  const rows = parseDubCsv(csv)
  if (rows.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No links found in this CSV export.' })
  }

  const existingLinks = await db.select().from(schema.links)
  const bySlug = new Map(existingLinks.map(link => [link.slug, link]))

  let created = 0
  let updated = 0
  let skipped = 0

  for (const row of rows) {
    const existing = bySlug.get(row.slug)
    const now = new Date()

    try {
      if (existing) {
        const tags = [...new Set([...existing.tags, ...row.tags])].slice(0, 12)
        await db
          .update(schema.links)
          .set({
            clicks: Math.max(existing.clicks, row.clicks),
            dubId: row.dubId ?? existing.dubId,
            tags,
            updatedAt: now,
            ...(existing.category === 'Imported' ? { url: row.url } : {})
          })
          .where(eq(schema.links.id, existing.id))
        updated += 1
        continue
      }

      await db.insert(schema.links).values({
        id: row.dubId ?? crypto.randomUUID(),
        slug: row.slug,
        url: row.url,
        title: humanizeSlug(row.slug),
        label: null,
        description: null,
        icon: null,
        category: 'Imported',
        tags: row.tags.length ? row.tags : ['imported'],
        featured: false,
        listed: false,
        archived: row.archived,
        position: 1000,
        clicks: row.clicks,
        dubId: row.dubId,
        lastClickedAt: null,
        createdAt: row.createdAt,
        updatedAt: now
      })
      created += 1
    }
    catch (error) {
      console.error(`[links] Failed to import ${row.slug}`, error)
      skipped += 1
    }
  }

  return { created, updated, skipped }
})
