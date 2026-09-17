export function getLanguageColor(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('vue')) return 'var(--color-emerald-500)'
  if (n.includes('typescript') || n === 'ts') return 'var(--color-blue-500)'
  if (n.includes('python')) return 'var(--color-amber-500)'
  if (n.includes('javascript') || n === 'js') return 'var(--color-yellow-400)'
  if (n.includes('php')) return 'var(--color-violet-500)'
  if (n.includes('css')) return 'var(--color-pink-500)'
  if (n.includes('html')) return 'var(--color-orange-500)'
  if (n.includes('rust')) return 'var(--color-orange-600)'
  if (n.includes('go')) return 'var(--color-cyan-500)'
  return 'var(--color-red-500)'
}

export function getEditorColor(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('vs code') || n.includes('visual studio code') || n === 'vscode') return 'var(--color-blue-500)'
  if (n.includes('webstorm')) return 'var(--color-amber-500)'
  if (n.includes('intellij')) return 'var(--color-violet-500)'
  if (n.includes('cursor')) return 'var(--color-neutral-800)'
  if (n.includes('zed')) return 'var(--color-emerald-600)'
  if (n.includes('positron')) return 'var(--color-teal-500)'
  if (n.includes('pycharm')) return 'var(--color-green-600)'
  return 'var(--color-sky-500)'
}

export function getOSColor(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('mac') || n.includes('darwin') || n.includes('macos')) return 'var(--color-neutral-700)'
  if (n.includes('windows') || n.includes('win')) return 'var(--color-blue-500)'
  if (n.includes('linux')) return 'var(--color-orange-500)'
  return 'var(--color-sky-500)'
}
