export default defineNitroPlugin((nitroApp) => {
  // Strip chrome (nav, header, footer, sidebars) from HTML -> Markdown so
  // llms.txt, .md twins and the D1 index contain content, not navigation.
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

  // Append provenance to runtime .md responses (prerendered .md twins and
  // llms-full.txt include their changes too).
  nitroApp.hooks.hook('ai-ready:page:markdown', (ctx: { markdown: string, route: string, isPrerender?: boolean }) => {
    if (!ctx.markdown) return
    ctx.markdown += `\n\n---\nSource: https://arthurdanjou.fr${ctx.route}`
  })
})
