interface Nav {
  label: string
  to: string
  icon?: string
  target?: string
}

export const navs: readonly Nav[] = [
  { label: 'home', to: '/', icon: 'i-ph-house-duotone' },
  { label: 'research', to: '/research', icon: 'i-ph-flask-duotone' },
  { label: 'projects', to: '/projects', icon: 'i-ph-folder-duotone' },
  { label: 'publications', to: '/publish', icon: 'i-ph-books-duotone' },
  { label: 'telemetry', to: '/telemetry', icon: 'i-ph-activity-duotone' },
  { label: 'uses', to: '/uses', icon: 'i-ph-tree-evergreen-duotone' },
  {
    label: 'resume',
    icon: 'i-ph-address-book-duotone',
    to: '/resumes/en',
    target: '_blank'
  }
] as const
