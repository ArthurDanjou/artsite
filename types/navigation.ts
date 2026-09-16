interface Nav {
  label: string
  to: string
  icon?: string
  target?: string
}

export const navs: readonly Nav[] = [
  { label: 'home', to: '/', icon: 'house-duotone' },
  { label: 'research', to: '/research', icon: 'flask-duotone' },
  { label: 'projects', to: '/projects', icon: 'folder-duotone' },
  { label: 'talks', to: '/talks', icon: 'microphone-stage-duotone' },
  { label: 'now', to: '/now', icon: 'clock-countdown-duotone' },
  { label: 'uses', to: '/uses', icon: 'tree-evergreen-duotone' },
  { label: 'hobbies', to: '/hobbies', icon: 'game-controller-duotone' },
  {
    label: 'resume',
    icon: 'address-book-duotone',
    to: '/resumes/en',
    target: '_blank'
  }
] as const
