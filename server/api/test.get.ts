export default defineEventHandler((event) => {
  console.log(globalThis.__env__)

  return event
})
