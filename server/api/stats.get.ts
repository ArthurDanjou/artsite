export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const coding = await $fetch(`https://wakatime.com/share/${config.wakatimeUserId}/${config.wakatimeCodig}.json`)
  const editors = await $fetch(`https://wakatime.com/share/${config.wakatimeUserId}/${config.wakatimeEditors}.json`)
  const os = await $fetch(`https://wakatime.com/share/${config.wakatimeUserId}/${config.wakatimeOs}.json`)
  const languages = await $fetch(`https://wakatime.com/share/${config.wakatimeUserId}/${config.wakatimeLanguages}.json`)
  return {
    coding,
    editors,
    os,
    languages
  }
})
