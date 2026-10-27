import { eq } from 'drizzle-orm'
import { db, schema } from 'hub:db'
import { assertLinksAdmin } from '../../../utils/links-admin'

export default defineEventHandler(async (event) => {
  assertLinksAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing link id.' })
  }

  const [link] = await db
    .select({ id: schema.links.id })
    .from(schema.links)
    .where(eq(schema.links.id, id))
    .limit(1)

  if (!link) {
    throw createError({ statusCode: 404, statusMessage: 'Link not found.' })
  }

  await db.batch([
    db.delete(schema.linkClicks).where(eq(schema.linkClicks.linkId, id)),
    db.delete(schema.links).where(eq(schema.links.id, id))
  ])

  return { deleted: true }
})
