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
