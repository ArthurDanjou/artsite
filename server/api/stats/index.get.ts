export default defineCachedEventHandler(async (event) => {
  const { wakatime } = useRuntimeConfig(event)

  const coding = await $fetch(`https://wakatime.com/share/${wakatime.userId}/${wakatime.coding}.json`)
  const editors = await $fetch(`https://wakatime.com/share/${wakatime.userId}/${wakatime.editors}.json`)
  const os = await $fetch(`https://wakatime.com/share/${wakatime.userId}/${wakatime.os}.json`)
  const languages = await $fetch(`https://wakatime.com/share/${wakatime.userId}/${wakatime.languages}.json`)

  return {
    coding,
    editors,
    os,
    languages
  }
}, {
  maxAge: 24 * 60 * 60,
  name: 'wakatime'
})
