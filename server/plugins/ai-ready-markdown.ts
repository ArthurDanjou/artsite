import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { groupPublicLinks, LINKS_PAGE_PATH, shortLinkUrl } from '~~/shared/links'

interface MarkdownSourceContext {
  route: string
  event: H3Event
  source: { markdown: string, title?: string, description?: string, updatedAt?: string } | null
}

export default defineNitroPlugin((nitroApp) => {
  // The links page is rendered at runtime, so its markdown twin has no build
  // output. Serve the links list from the source collection instead of letting
  // nuxt-ai-ready fetch the HTML page from the Worker.
  nitroApp.hooks.hook('ai-ready:markdown:source', async (context: MarkdownSourceContext) => {
    if (context.route !== LINKS_PAGE_PATH) return

    const items = await queryCollection(context.event, 'links').all()
    const { groups, socials } = groupPublicLinks(items)
    const lines = [
      '# Links',
      '',
      'All my links in one place: research, projects, social profiles, CV, and contact.',
      ''
    ]

    for (const section of [...(socials.length ? [{ label: 'Social', links: socials }] : []), ...groups]) {
      lines.push(`## ${section.label}`, '')
      for (const link of section.links) {
        const suffix = link.description ? `: ${link.description}` : ''
        lines.push(`- [${link.title}](${shortLinkUrl(link.slug)})${suffix}`)
      }
      lines.push('')
    }

    context.source = {
      title: 'Links',
      description: 'All my links in one place: research, projects, social profiles, CV, and contact.',
      markdown: lines.join('\n')
    }
  })

  nitroApp.hooks.hook('ai-ready:mdreamConfig', (config: { filter?: { exclude?: string[] } }) => {
    config.filter = {
      ...config.filter,
      exclude: [
        ...(config.filter?.exclude || []),
        'nav',
        'header',
        'footer',
        '.sidebar',
        '.footer',
        '#site-header',
        '#site-footer'
      ]
    }
  })

  nitroApp.hooks.hook('ai-ready:page:markdown', (ctx: { markdown: string, route: string, isPrerender?: boolean }) => {
    if (!ctx.markdown) return
    ctx.markdown += `\n\n---\nSource: https://arthurdanjou.fr${ctx.route}`
  })
})
