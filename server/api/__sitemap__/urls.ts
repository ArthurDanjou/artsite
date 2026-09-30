import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event) => {
  const projects = await queryCollection(event, 'projects')
    .where('extension', '=', 'md')
    .all()
    .catch(() => [])

  return projects.map(project => ({
    loc: `/projects/${project.slug}`,
    lastmod: project.publishedAt,
    changefreq: 'monthly' as const,
    priority: 0.8 as const
  }))
})
