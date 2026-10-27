import { z } from 'zod'
import { RESERVED_SLUGS } from '~~/shared/links'

function isValidDestination(value: string): boolean {
  try {
    const url = new URL(value)
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)
  }
  catch {
    return false
  }
}

const nullableText = (maxLength: number) => z
  .string()
  .trim()
  .max(maxLength)
  .nullable()
  .optional()
  .transform(value => value || null)

export const linkInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9][a-z0-9-_]*$/i, 'Slug must contain letters, numbers, dashes or underscores.')
    .transform(value => value.toLowerCase())
    .refine(value => !RESERVED_SLUGS.has(value), 'This slug is reserved.'),
  url: z.string().trim().min(1).max(2048).refine(isValidDestination, 'Destination must be an http, https, mailto or tel URL.'),
  title: z.string().trim().min(1).max(120),
  label: nullableText(40),
  description: nullableText(280),
  icon: nullableText(80),
  category: z.string().trim().min(1).max(40),
  tags: z.array(z.string().trim().min(1).max(30)).max(12).default([]),
  featured: z.boolean().default(false),
  listed: z.boolean().default(true),
  archived: z.boolean().default(false),
  position: z.number().int().min(0).max(10000).default(1000)
})

export const linkPatchSchema = linkInputSchema.partial()

export type LinkInput = z.infer<typeof linkInputSchema>
export type LinkPatchInput = z.infer<typeof linkPatchSchema>

export function parseWithSchema<T>(schema: z.ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid link payload.',
      data: { issues: result.error.issues }
    })
  }
  return result.data
}
