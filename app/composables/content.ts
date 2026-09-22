export async function useContent() {
  const [skills, projects, publications, contact, talks, languages] = await Promise.all([
    queryCollection('skills').where('extension', '=', 'json').first(),
    queryCollection('projects').where('extension', '=', 'md').order('publishedAt', 'DESC').all(),
    queryCollection('publications').where('extension', '=', 'json').first(),
    queryCollection('contact').where('extension', '=', 'json').first(),
    queryCollection('talks').where('extension', '=', 'json').first(),
    queryCollection('languages').where('extension', '=', 'json').first()
  ])

  return { skills, projects, publications, contact, talks, languages }
}
