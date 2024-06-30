import { useValidatedParams, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const { slug } = await useValidatedParams(event, {
    slug: z.string()
  })
  return useDB().insert(tables.posts).values({
    slug
  }).onConflictDoUpdate({
    target: tables.posts.slug,
    set: {
      slug,
      views: sql`${tables.posts.views}
      + 1`
    }
  }).returning().get()
})
