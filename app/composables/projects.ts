export function useProjectColors() {
  const statusColors: Record<string, string> = {
    'active': 'blue',
    'completed': 'green',
    'archived': 'neutral',
    'in progress': 'amber'
  }

  const typeColors: Record<string, string> = {
    'Personal Project': 'purple',
    'Academic Project': 'sky',
    'Infrastructure Project': 'emerald',
    'Internship Project': 'orange',
    'Research Project': 'blue'
  }

  return {
    statusColors,
    typeColors
  }
}
