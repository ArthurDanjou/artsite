import { H3Event } from 'h3'

export default defineEventHandler(async (event) => {
  const [coding, editors, os, languages] = await Promise.all([
    cachedWakatimeCoding(event),
    cachedWakatimeEditors(event),
    cachedWakatimeOs(event),
    cachedWakatimeLanguages(event)
  ])

  return {
    coding,
    editors,
    os,
    languages
  }
})

const cachedWakatimeCoding = defineCachedFunction(async (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return await $fetch(`https://wakatime.com/share/${config.wakatimeUserId}/${config.wakatimeCodig}.json`)
}, {
  maxAge: 24 * 60 * 60, // Wakatime does not update there data more than once a day
  name: 'wakatime',
  getKey: () => 'coding'
})

const cachedWakatimeEditors = defineCachedFunction(async (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return await $fetch(`https://wakatime.com/share/${config.wakatimeUserId}/${config.wakatimeEditors}.json`)
}, {
  maxAge: 24 * 60 * 60, // Wakatime does not update there data more than once a day
  name: 'wakatime',
  getKey: () => 'editors'
})

const cachedWakatimeOs = defineCachedFunction(async (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return await $fetch(`https://wakatime.com/share/${config.wakatimeUserId}/${config.wakatimeOs}.json`)
}, {
  maxAge: 24 * 60 * 60, // Wakatime does not update there data more than once a day
  name: 'wakatime',
  getKey: () => 'os'
})

const cachedWakatimeLanguages = defineCachedFunction(async (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return await $fetch(`https://wakatime.com/share/${config.wakatimeUserId}/${config.wakatimeLanguages}.json`)
}, {
  maxAge: 24 * 60 * 60, // Wakatime does not update there data more than once a day
  name: 'wakatime',
  getKey: () => 'languages'
})
