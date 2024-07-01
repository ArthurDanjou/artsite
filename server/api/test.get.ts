export default defineEventHandler((event) => {
  console.error(globalThis.__env__)

  return event
})
