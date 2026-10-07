export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('ai-ready:mdreamConfig', (config: { filter?: { exclude?: string[] } }) => {
    config.filter = {
      ...config.filter,
      exclude: [
        ...(config.filter?.exclude || []),
        'nav',
        'header',
        'footer',
        '.sidebar',
        '.footer',
        '#site-header',
        '#site-footer'
      ]
    }
  })

  nitroApp.hooks.hook('ai-ready:page:markdown', (ctx: { markdown: string, route: string, isPrerender?: boolean }) => {
    if (!ctx.markdown) return
    ctx.markdown += `\n\n---\nSource: https://arthurdanjou.fr${ctx.route}`
  })
})
