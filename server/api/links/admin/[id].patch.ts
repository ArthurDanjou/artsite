import { eq } from 'drizzle-orm'
import { db, schema } from 'hub:db'
import { assertLinksAdmin } from '../../../utils/links-admin'
import { linkPatchSchema, parseWithSchema } from '../../../utils/links-input'
import { serializeAdminLink } from '../../../utils/links'

export default defineEventHandler(async (event) => {
  assertLinksAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing link id.' })
  }

  const raw = await readBody<Record<string, unknown>>(event)
  const payload = parseWithSchema(linkPatchSchema, raw)
  const update = Object.fromEntries(
    Object.keys(raw)
      .filter(key => key in payload)
      .map(key => [key, (payload as Record<string, unknown>)[key]])
  ) as Partial<typeof schema.links.$inferInsert>

  if (Object.keys(update).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No fields to update.' })
  }

  try {
    const [updated] = await db
      .update(schema.links)
      .set({ ...update, updatedAt: new Date() })
      .where(eq(schema.links.id, id))
      .returning()

    if (!updated) {
      throw createError({ statusCode: 404, statusMessage: 'Link not found.' })
    }

    return serializeAdminLink(updated)
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (message.includes('UNIQUE constraint failed')) {
      throw createError({ statusCode: 409, statusMessage: 'A link with this slug already exists.' })
    }
    throw error
  }
})
