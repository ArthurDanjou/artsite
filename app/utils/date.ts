export function formatTalkDate(iso: string): string {
  const parts = iso.split('-').map(Number)
  if (parts.length < 2 || parts.some(n => !Number.isFinite(n))) return iso
  const [year, month, day] = parts as [number, number, number?]
  const date = day ? new Date(year, month - 1, day) : new Date(year, month - 1, 1)
  return date.toLocaleDateString('en-US', day ? { year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' })
}

export function formatLongDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
