import { queryCollection } from '@nuxt/content/server'
import { renderSVG } from 'uqr'
import { shortLinkUrl } from '~~/shared/links'

export default defineEventHandler(async (event) => {
  const rawSlug = getRouterParam(event, 'slug')
  if (!rawSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug.' })
  }

  const slug = decodeURIComponent(rawSlug).replace(/\.svg$/i, '').toLowerCase()
  const link = await queryCollection(event, 'links')
    .where('slug', '=', slug)
    .first()

  if (!link || link.archived) {
    throw createError({ statusCode: 404, statusMessage: 'Link not found.' })
  }

  const svg = renderSVG(shortLinkUrl(link.slug), {
    border: 2,
    blackColor: '#171717',
    whiteColor: '#ffffff'
  })

  setHeader(event, 'Content-Type', 'image/svg+xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')
  return svg
})
