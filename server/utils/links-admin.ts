import { timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'
import { createError, getHeader } from 'h3'

function safeEqual(left: string, right: string): boolean {
  const leftBytes = new TextEncoder().encode(left)
  const rightBytes = new TextEncoder().encode(right)

  if (leftBytes.length !== rightBytes.length) return false
  return timingSafeEqual(leftBytes, rightBytes)
}

export function assertLinksAdmin(event: H3Event): void {
  const config = useRuntimeConfig(event)
  const expected = config.links.adminToken

  if (!expected) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Links admin token is not configured.'
    })
  }

  const authorization = getHeader(event, 'authorization') ?? ''
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : getHeader(event, 'x-links-admin-token') ?? ''

  if (!token || !safeEqual(token, expected)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid admin token.'
    })
  }
}
