import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const links = sqliteTable('links', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  label: text('label'),
  description: text('description'),
  icon: text('icon'),
  category: text('category').notNull().default('Other'),
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull(),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  listed: integer('listed', { mode: 'boolean' }).notNull().default(true),
  archived: integer('archived', { mode: 'boolean' }).notNull().default(false),
  position: integer('position').notNull().default(1000),
  clicks: integer('clicks').notNull().default(0),
  dubId: text('dub_id'),
  lastClickedAt: integer('last_clicked_at', { mode: 'timestamp_ms' }),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date())
}, table => [
  uniqueIndex('links_slug_unique').on(table.slug),
  uniqueIndex('links_dub_id_unique').on(table.dubId),
  index('links_public_idx').on(table.listed, table.archived, table.position)
])

export const linkClicks = sqliteTable('link_clicks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  linkId: text('link_id').notNull().references(() => links.id, { onDelete: 'cascade' }),
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
  index('link_clicks_link_idx').on(table.linkId, table.timestamp),
  index('link_clicks_timestamp_idx').on(table.timestamp)
])
