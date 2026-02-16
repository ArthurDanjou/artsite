export default defineCachedEventHandler(async (event) => {
  const log = useLogger(event)
  log.set({ action: 'resume.redirect', locale: 'fr' })
  return sendRedirect(event, '/resumes/CV 2026 FR.pdf', 302)
}, {
  maxAge: 60 * 60 * 24,
  name: 'resume_fr'
})
