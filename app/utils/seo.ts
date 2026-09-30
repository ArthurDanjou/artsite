export function truncateMetaText(text: string, maxLength: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  const cut = normalized.slice(0, maxLength - 1).replace(/[\s,;:.-]+$/, '')
  const boundary = cut.lastIndexOf(' ')
  return `${(boundary > maxLength * 0.5 ? cut.slice(0, boundary) : cut).trim()}…`
}
