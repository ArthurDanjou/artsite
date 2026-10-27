import { db, schema } from 'hub:db'
import { assertLinksAdmin } from '../../../utils/links-admin'
import { linkInputSchema, parseWithSchema } from '../../../utils/links-input'
import { serializeAdminLink } from '../../../utils/links'

export default defineEventHandler(async (event) => {
  assertLinksAdmin(event)

  const payload = parseWithSchema(linkInputSchema, await readBody(event))
  const now = new Date()

  try {
    const [created] = await db
      .insert(schema.links)
      .values({
        id: crypto.randomUUID(),
        ...payload,
        dubId: null,
        createdAt: now,
        updatedAt: now
      })
      .returning()

    if (!created) {
      throw createError({ statusCode: 500, statusMessage: 'Could not create the link.' })
    }

    return serializeAdminLink(created)
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (message.includes('UNIQUE constraint failed')) {
      throw createError({ statusCode: 409, statusMessage: 'A link with this slug already exists.' })
    }
    throw error
  }
})
