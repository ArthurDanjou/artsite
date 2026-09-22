export function groupByYearDesc<T>(items: T[], getYear: (item: T) => number | undefined): Record<string, T[]> {
  const sorted = [...items].sort((a, b) => (getYear(b) ?? 0) - (getYear(a) ?? 0))
  const groups: Record<string, T[]> = {}
  for (const item of sorted) {
    const year = getYear(item)
    const key = year ? String(year) : 'TBA'
    ;(groups[key] ||= []).push(item)
  }
  return groups
}
