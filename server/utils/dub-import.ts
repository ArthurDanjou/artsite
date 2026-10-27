import { normalizeSlug } from '~~/shared/links'

export interface DubImportRow {
  slug: string
  url: string
  clicks: number
  createdAt: Date
  dubId: string | null
  tags: string[]
  archived: boolean
}

function detectDelimiter(text: string): string {
  const firstLine = text.split(/\r?\n/).find(line => line.trim().length > 0) ?? ''
  const tabs = (firstLine.match(/\t/g) ?? []).length
  const commas = (firstLine.match(/,/g) ?? []).length
  return tabs > commas ? '\t' : ','
}

function parseDelimited(text: string, delimiter: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]

    if (quoted) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          field += '"'
          index += 1
        }
        else {
          quoted = false
        }
      }
      else {
        field += character
      }
      continue
    }

    if (character === '"') {
      quoted = true
      continue
    }

    if (character === delimiter) {
      row.push(field)
      field = ''
      continue
    }

    if (character === '\n') {
      row.push(field)
      field = ''
      if (row.some(value => value.trim().length > 0)) rows.push(row)
      row = []
      continue
    }

    if (character !== '\r') field += character
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    if (row.some(value => value.trim().length > 0)) rows.push(row)
  }

  return rows
}

function normalizedHeader(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

function indexOfHeader(headers: string[], names: string[]): number {
  return headers.findIndex(header => names.includes(header))
}

const SHORT_LINK_ALIASES: Record<string, string> = {
  'https://cal.link/arthur': 'call',
  'https://git.new/arthur': 'git'
}

// Links removed on request and not re-created by a Dub re-import.
const SKIP_SLUGS = new Set(['datavis-app', 'artchat'])

function slugFromLink(value: string): string | null {
  const alias = SHORT_LINK_ALIASES[value.trim()]
  if (alias) return alias

  try {
    const url = new URL(value)
    const segments = url.pathname.split('/').filter(Boolean)
    const last = segments.at(-1)
    if (!last) return null
    const slug = normalizeSlug(decodeURIComponent(last))
    return SKIP_SLUGS.has(slug) ? null : slug
  }
  catch {
    const segments = value.split('/').filter(Boolean)
    const last = segments.at(-1)
    if (!last) return null
    const slug = normalizeSlug(decodeURIComponent(last))
    return SKIP_SLUGS.has(slug) ? null : slug
  }
}

function parseDate(value: string | undefined): Date {
  if (!value) return new Date()
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date() : date
}

function parseTags(value: string | undefined): string[] {
  if (!value) return []
  return value
    .split(/[,;]/)
    .map(tag => tag.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 12)
}

function isArchived(value: string | undefined): boolean {
  if (!value) return false
  return ['1', 'true', 'yes', 'y'].includes(value.trim().toLowerCase())
}

export function parseDubCsv(text: string): DubImportRow[] {
  const rows = parseDelimited(text.replace(/^\uFEFF/, ''), detectDelimiter(text))
  if (rows.length === 0) return []

  const firstRow = rows[0]?.map(normalizedHeader) ?? []
  const hasHeader = firstRow.some(value => ['link', 'shortlink', 'url', 'clicks'].includes(value))
  const headers = hasHeader ? firstRow : []
  const dataRows = hasHeader ? rows.slice(1) : rows

  const linkIndex = hasHeader ? indexOfHeader(headers, ['link', 'shortlink', 'short url']) : 0
  const urlIndex = hasHeader ? indexOfHeader(headers, ['url', 'destination']) : 1
  const clicksIndex = hasHeader ? indexOfHeader(headers, ['clicks']) : 2
  const createdIndex = hasHeader ? indexOfHeader(headers, ['created', 'createdat']) : 6
  const idIndex = hasHeader ? indexOfHeader(headers, ['id', 'linkid']) : 7
  const tagsIndex = hasHeader ? indexOfHeader(headers, ['tags']) : 9
  const archivedIndex = hasHeader ? indexOfHeader(headers, ['archived']) : 10

  const result: DubImportRow[] = []

  for (const row of dataRows) {
    const shortLink = row[linkIndex]?.trim() ?? ''
    const url = row[urlIndex]?.trim() ?? ''
    if (!shortLink || !url) continue

    const slug = slugFromLink(shortLink)
    if (!slug || slug.includes('/')) continue

    const clicks = Number.parseInt(row[clicksIndex] ?? '', 10)

    result.push({
      slug,
      url,
      clicks: Number.isFinite(clicks) && clicks > 0 ? clicks : 0,
      createdAt: parseDate(row[createdIndex]),
      dubId: row[idIndex]?.trim() || null,
      tags: parseTags(row[tagsIndex]),
      archived: isArchived(row[archivedIndex])
    })
  }

  return result
}

export function humanizeSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, character => character.toUpperCase())
}
