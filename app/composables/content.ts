export async function useContent() {
  const skills = await queryCollection('skills').where('extension', '=', 'json').first()
  const projects = await queryCollection('projects').where('extension', '=', 'md').order('publishedAt', 'DESC').all()
  const education = await queryCollection('education').where('extension', '=', 'md').order('startDate', 'DESC').all()
  const experiences = await queryCollection('experiences').where('extension', '=', 'md').order('startDate', 'DESC').all()

  return { skills, projects, education, experiences }
}
