export interface YearGroup<T> {
  year: string
  items: T[]
}

export function groupByYearDesc<T>(
  items: T[],
  getYear: (item: T) => number | undefined
): YearGroup<T>[] {
  const sorted = [...items].sort((a, b) => (getYear(b) ?? 0) - (getYear(a) ?? 0))
  const groups = new Map<string, T[]>()
  for (const item of sorted) {
    const year = getYear(item)
    const key = year ? String(year) : 'TBA'
    const group = groups.get(key)
    if (group) group.push(item)
    else groups.set(key, [item])
  }
  return Array.from(groups, ([year, groupItems]) => ({ year, items: groupItems }))
}
