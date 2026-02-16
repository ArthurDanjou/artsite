export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  log.set({ action: 'resume.redirect', locale: 'en' })
  return sendRedirect(event, '/resumes/CV 2026 EN.pdf', 302)
}, {
  maxAge: 60 * 60 * 24,
  name: 'resume_en'
})
