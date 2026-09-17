export async function useContent() {
  const [skills, projects, education, experiences, contact, talks, languages] = await Promise.all([
    queryCollection('skills').where('extension', '=', 'json').first(),
    queryCollection('projects').where('extension', '=', 'md').order('publishedAt', 'DESC').all(),
    queryCollection('education').where('extension', '=', 'md').order('startDate', 'DESC').all(),
    queryCollection('experiences').where('extension', '=', 'md').order('startDate', 'DESC').all(),
    queryCollection('contact').where('extension', '=', 'json').first(),
    queryCollection('talks').where('extension', '=', 'json').first(),
    queryCollection('languages').where('extension', '=', 'json').first()
  ])

  return { skills, projects, education, experiences, contact, talks, languages }
}
