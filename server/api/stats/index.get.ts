import type { H3Event } from 'h3'

const cachedWakatimeCoding = defineCachedFunction(async (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return await $fetch(`https://wakatime.com/share/${config.wakatime.userId}/${config.wakatime.coding}.json`)
}, {
  maxAge: 24 * 60 * 60,
  name: 'wakatime',
  getKey: () => 'coding',
})

const cachedWakatimeEditors = defineCachedFunction(async (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return await $fetch(`https://wakatime.com/share/${config.wakatime.userId}/${config.wakatime.editors}.json`)
}, {
  maxAge: 24 * 60 * 60,
  name: 'wakatime',
  getKey: () => 'editors',
})

const cachedWakatimeOs = defineCachedFunction(async (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return await $fetch(`https://wakatime.com/share/${config.wakatime.userId}/${config.wakatime.os}.json`)
}, {
  maxAge: 24 * 60 * 60,
  name: 'wakatime',
  getKey: () => 'os',
})

const cachedWakatimeLanguages = defineCachedFunction(async (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return await $fetch(`https://wakatime.com/share/${config.wakatime.userId}/${config.wakatime.languages}.json`)
}, {
  maxAge: 24 * 60 * 60,
  name: 'wakatime',
  getKey: () => 'languages',
})

export default defineEventHandler(async (event) => {
  const [coding, editors, os, languages] = await Promise.all([
    cachedWakatimeCoding(event),
    cachedWakatimeEditors(event),
    cachedWakatimeOs(event),
    cachedWakatimeLanguages(event),
  ])

  return {
    coding,
    editors,
    os,
    languages,
  }
})
