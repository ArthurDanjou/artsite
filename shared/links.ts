export const LINKS_SITE_URL = 'https://arthurdanjou.fr'
export const LINKS_PAGE_PATH = '/links'

export const SHORT_DOMAINS = ['links.arthurdanjou.fr', 'go.arthurdanjou.fr'] as const
export const SHORT_DOMAIN = SHORT_DOMAINS[0]
export const SHORT_LINK_BASE = `https://${SHORT_DOMAIN}`

export const CATEGORY_ORDER = ['Portfolio', 'Research', 'Engineering', 'Homelab', 'Social'] as const

export const RESERVED_SLUGS = new Set([
  'api',
  'assets',
  'favicon.ico',
  'links',
  'mcp',
  'qr',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'studio',
  'errors',
  '_ipx',
  '_nuxt',
  '_openapi.json',
  '__ai-ready',
  '__nuxt',
  '__skew'
])

export function isShortHost(hostname: string): boolean {
  return (SHORT_DOMAINS as readonly string[]).includes(hostname.toLowerCase())
}

export function shortLinkUrl(slug: string): string {
  return `${SHORT_LINK_BASE}/${slug}`
}

export function categoryRank(category: string): number {
  const index = (CATEGORY_ORDER as readonly string[]).indexOf(category)
  return index === -1 ? CATEGORY_ORDER.length : index
}

export function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
}

export function groupPublicLinks(items: Array<{
  slug: string
  title: string
  label?: string | null
  description?: string | null
  icon?: string | null
  category: string
  tags?: string[]
  featured?: boolean
  listed?: boolean
  position?: number
  archived?: boolean
}>): {
  groups: Array<{ label: string, links: ReturnType<typeof toPublicLink>[] }>
  socials: ReturnType<typeof toPublicLink>[]
} {
  const links = items
    .filter(item => item.listed !== false && !item.archived)
    .map(toPublicLink)
    .sort((left, right) => (left.position - right.position) || left.title.localeCompare(right.title))

  const socials = links.filter(link => link.category === 'Social')

  const groups = new Map<string, ReturnType<typeof toPublicLink>[]>()
  for (const link of links) {
    if (link.category === 'Social') continue
    const group = groups.get(link.category) ?? []
    group.push(link)
    groups.set(link.category, group)
  }

  return {
    socials,
    groups: [...groups.entries()]
      .sort(([left], [right]) => categoryRank(left) - categoryRank(right) || left.localeCompare(right))
      .map(([label, groupLinks]) => ({ label, links: groupLinks }))
  }
}

function toPublicLink(item: {
  slug: string
  title: string
  label?: string | null
  description?: string | null
  icon?: string | null
  category: string
  tags?: string[]
  featured?: boolean
  position?: number
}) {
  return {
    slug: item.slug,
    title: item.title,
    label: item.label ?? null,
    description: item.description ?? null,
    icon: item.icon ?? null,
    category: item.category,
    tags: Array.isArray(item.tags) ? item.tags : [],
    featured: item.featured === true,
    position: item.position ?? 1000
  }
}
