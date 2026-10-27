import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const linkClicks = sqliteTable('link_clicks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull(),
  timestamp: integer('timestamp', { mode: 'timestamp_ms' }).notNull(),
  country: text('country'),
  region: text('region'),
  city: text('city'),
  referrer: text('referrer'),
  userAgent: text('user_agent'),
  device: text('device'),
  browser: text('browser'),
  os: text('os')
}, table => [
  index('link_clicks_slug_idx').on(table.slug, table.timestamp),
  index('link_clicks_timestamp_idx').on(table.timestamp)
])
