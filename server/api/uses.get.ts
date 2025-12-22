import { queryCollection } from '@nuxt/content/server'

export default defineCachedEventHandler(async (event) => {
  const categories = await queryCollection(event, 'usesCategories')
    .where('extension', '=', 'md')
    .all()

  if (categories.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Uses categories not found' })
  }

  const uses = await queryCollection(event, 'uses')
    .where('extension', '=', 'md')
    .all()

  if (uses.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Uses not found' })
  }

  const uses_by_categories = []
  for (const category of categories) {
    uses_by_categories.push({
      category: category,
      uses: uses.filter((use: { category: unknown }) => use.category === category.slug)
    })
  }

  return uses_by_categories
},
{
  maxAge: 60 * 60 * 24,
  name: 'uses'
})
