export default defineEventHandler(() => {
  return useDB().query.posts.findMany()
})
