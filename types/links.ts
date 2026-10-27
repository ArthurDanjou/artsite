export interface PublicLink {
  slug: string
  title: string
  label: string | null
  description: string | null
  icon: string | null
  category: string
  tags: string[]
  featured: boolean
}

export interface LinkGroup {
  label: string
  links: PublicLink[]
}

export interface PublicLinksResponse {
  groups: LinkGroup[]
  socials: PublicLink[]
}

export interface AdminLink {
  id: string
  slug: string
  url: string
  title: string
  label: string | null
  description: string | null
  icon: string | null
  category: string
  tags: string[]
  featured: boolean
  listed: boolean
  archived: boolean
  position: number
  clicks: number
  dubId: string | null
  lastClickedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface AdminLinkSummary {
  totalLinks: number
  totalClicks: number
  clicks7d: number
  topLink: {
    title: string
    slug: string
    clicks: number
  } | null
}

export interface AdminLinksResponse {
  links: AdminLink[]
  summary: AdminLinkSummary
}

export interface StatsBucket {
  value: string
  count: number
}

export interface DailyClick {
  date: string
  count: number
}

export interface AdminLinkStats {
  link: AdminLink
  trackedClicks: number
  daily: DailyClick[]
  countries: StatsBucket[]
  referrers: StatsBucket[]
  devices: StatsBucket[]
}

export interface ImportLinksResult {
  created: number
  updated: number
  skipped: number
}
