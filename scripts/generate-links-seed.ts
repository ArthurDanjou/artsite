import seed from '../server/db/seed-links.json'

function sqlString(value: string): string {
  return `'${value.replace(/'/g, '\'\'')}'`
}

function sqlNullable(value: string | null | undefined): string {
  return value == null ? 'NULL' : sqlString(value)
}

function sqlBoolean(value: boolean): string {
  return value ? '1' : '0'
}

function sqlDate(value: string): string {
  return String(Date.parse(value))
}

const columns = [
  'id',
  'slug',
  'url',
  'title',
  'label',
  'description',
  'icon',
  'category',
  'tags',
  'featured',
  'listed',
  'archived',
  'position',
  'clicks',
  'dub_id',
  'last_clicked_at',
  'created_at',
  'updated_at'
]

const rows = seed.map((link) => {
  const values = [
    sqlString(link.id),
    sqlString(link.slug),
    sqlString(link.url),
    sqlString(link.title),
    sqlNullable(link.label),
    sqlNullable(link.description),
    sqlNullable(link.icon),
    sqlString(link.category),
    sqlString(JSON.stringify(link.tags)),
    sqlBoolean(link.featured),
    sqlBoolean(link.listed),
    sqlBoolean(link.archived),
    String(link.position),
    String(link.clicks),
    sqlNullable(link.dubId),
    'NULL',
    sqlDate(link.createdAt),
    sqlDate(link.updatedAt)
  ]

  return `  (${values.join(', ')})`
})

const statement = `-- Curated Dub import for links.arthurdanjou.fr.\nINSERT OR IGNORE INTO \`links\` (${columns.map(column => `\`${column}\``).join(', ')})\nVALUES\n${rows.join(',\n')};\n`

process.stdout.write(statement)
