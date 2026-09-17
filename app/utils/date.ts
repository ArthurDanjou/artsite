export function formatTalkDate(iso: string): string {
  const parts = iso.split('-').map(Number)
  if (parts.length < 2 || parts.some(n => !Number.isFinite(n))) return iso
  const [year, month, day] = parts as [number, number, number?]
  const date = day ? new Date(year, month - 1, day) : new Date(year, month - 1, 1)
  return date.toLocaleDateString('en-US', day ? { year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' })
}

export function formatTimelineDate(start?: string, end?: string, duration?: string): string {
  if (!start) return 'N/A'

  const startYear = new Date(start).getFullYear()
  const endYear = end ? new Date(end).getFullYear() : 'Present'
  const durationText = duration ? `(${duration})` : ''

  if (startYear === endYear) {
    return `${startYear} ${durationText}`
  }
  return `${startYear} - ${endYear} ${durationText}`
}

export function formatLongDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
