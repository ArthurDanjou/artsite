const INDEX_NOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const INDEX_NOW_LIMIT = 10000

export async function submitIndexNow(
  paths: string[],
  config: { key: string, siteUrl: string }
) {
  if (paths.length === 0) return

  if (!config.key) {
    throw new Error('IndexNow key is not configured.')
  }

  const site = new URL(config.siteUrl)
  const urls = paths.map((path) => {
    const url = new URL(path, `${site.origin}/`)

    if (url.origin !== site.origin) {
      throw new Error(`IndexNow URL must use ${site.origin}.`)
    }

    url.hash = ''
    return url.href
  })
  const urlList = [...new Set(urls)]

  if (urlList.length > INDEX_NOW_LIMIT) {
    throw new Error(`IndexNow accepts at most ${INDEX_NOW_LIMIT} URLs per request.`)
  }

  await $fetch(INDEX_NOW_ENDPOINT, {
    method: 'POST',
    body: {
      host: site.host,
      key: config.key,
      keyLocation: new URL('/indexnow-key.txt', site).href,
      urlList
    }
  })
}
