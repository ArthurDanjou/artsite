import type { H3Event } from 'h3'

const WAKATIME_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json'
}

const fetchWakatime = async (url: string, log: ReturnType<typeof useLogger>) => {
  try {
    return await $fetch<{ data: unknown[] }>(url, {
      headers: WAKATIME_HEADERS,
      timeout: 5000
    })
  }
  catch (err) {
    log.error(err)
    log.set({
      wakatime: {
        request: url,
        fallback: true
      }
    })
    return { data: [] }
  }
}

const cachedWakatimeCoding = defineCachedFunction(async (event: H3Event) => {
  const log = useLogger(event)
  const config = useRuntimeConfig(event)
  return await fetchWakatime(`https://wakatime.com/share/${config.wakatime.userId}/${config.wakatime.coding}.json`, log)
}, {
  maxAge: 60 * 50,
  name: 'stats',
  getKey: () => 'coding'
})

const cachedWakatimeEditors = defineCachedFunction(async (event: H3Event) => {
  const log = useLogger(event)
  const config = useRuntimeConfig(event)
  return await fetchWakatime(`https://wakatime.com/share/${config.wakatime.userId}/${config.wakatime.editors}.json`, log)
}, {
  maxAge: 60 * 60,
  name: 'stats',
  getKey: () => 'editors'
})

const cachedWakatimeOs = defineCachedFunction(async (event: H3Event) => {
  const log = useLogger(event)
  const config = useRuntimeConfig(event)
  return await fetchWakatime(`https://wakatime.com/share/${config.wakatime.userId}/${config.wakatime.os}.json`, log)
}, {
  maxAge: 60 * 60,
  name: 'stats',
  getKey: () => 'os'
})

const cachedWakatimeLanguages = defineCachedFunction(async (event: H3Event) => {
  const log = useLogger(event)
  const config = useRuntimeConfig(event)
  return await fetchWakatime(`https://wakatime.com/share/${config.wakatime.userId}/${config.wakatime.languages}.json`, log)
}, {
  maxAge: 60 * 60,
  name: 'stats',
  getKey: () => 'languages'
})

export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  const [coding, editors, os, languages] = await Promise.all([
    cachedWakatimeCoding(event),
    cachedWakatimeEditors(event),
    cachedWakatimeOs(event),
    cachedWakatimeLanguages(event)
  ])

  log.set({
    wakatime: {
      codingPoints: coding.data.length,
      editorPoints: editors.data.length,
      osPoints: os.data.length,
      languagePoints: languages.data.length
    }
  })

  return {
    success: true,
    data: {
      coding: coding.data,
      editors: editors.data,
      os: os.data,
      languages: languages.data
    }
  }
})
