export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('ai-ready:page:indexed', async (ctx: { contentChanged?: boolean, route: string }) => {
    if (!ctx.contentChanged) return

    const { indexNowKey, indexNowSiteUrl } = useRuntimeConfig()
    if (!indexNowKey || !indexNowSiteUrl) return

    try {
      await submitIndexNow([ctx.route], {
        key: indexNowKey as string,
        siteUrl: indexNowSiteUrl as string
      })
    }
    catch (error) {
      console.error(`[indexnow] Failed to submit ${ctx.route}`, error)
    }
  })
})
