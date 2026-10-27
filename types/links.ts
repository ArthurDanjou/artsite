export interface ContentLink {
  slug: string
  url: string
  title: string
  label?: string | null
  description?: string | null
  icon?: string | null
  category: string
  tags: string[]
  featured: boolean
  listed: boolean
  position: number
  archived: boolean
}

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
