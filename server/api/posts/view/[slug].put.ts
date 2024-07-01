import { useValidatedParams, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const { slug } = await useValidatedParams(event, {
    slug: z.string()
  })
  return useDB().update(tables.posts)
    .set({
      views: sql`${tables.posts.views}
      + 1`
    })
    .where(eq(tables.posts.slug, slug))
})
