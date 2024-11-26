import { sql } from 'drizzle-orm'
import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core'

export const posts = sqliteTable('posts', {
  slug: text('slug').primaryKey(),
  likes: integer('likes').default(0),
  views: integer('views').default(0),
  createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
})
