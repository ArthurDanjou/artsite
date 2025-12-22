export default defineCachedEventHandler(async (event) => {
  return sendRedirect(event, '/resumes/CV 2026 EN.pdf', 302)
}, {
  maxAge: 60 * 60 * 24,
  name: 'resume_en'
})
