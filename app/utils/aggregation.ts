/**
 * Two-dimensional gradient space used by the aggregation figure.
 *
 * The honest gradients sit on a golden-angle spiral so the cloud is the same on
 * the server and the client. The adversarial offsets are relative to the handle
 * the reader drags. Nothing here is a training run: this is a schematic view of
 * the rules, and the recorded curves on the page carry the real numbers.
 */
export interface Point {
  x: number
  y: number
}

export const HONEST_GRADIENT_COUNT = 40

export const HONEST_GRADIENTS: readonly Point[] = Array.from(
  { length: HONEST_GRADIENT_COUNT },
  (_, index) => {
    const angle = index * 2.3999632297
    const radius = Math.sqrt((index + 0.5) / HONEST_GRADIENT_COUNT)
    return {
      x: 178 + Math.cos(angle) * radius * 76,
      y: 172 + Math.sin(angle) * radius * 58
    }
  }
)

export const ADVERSARIAL_OFFSETS: readonly Point[] = Array.from(
  { length: 20 },
  (_, index) => {
    const angle = index * 2.3999632297
    const radius = Math.sqrt(index + 1) * 6.5
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.8 }
  }
)

export function average(points: readonly Point[]): Point {
  return {
    x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
    y: points.reduce((sum, point) => sum + point.y, 0) / points.length
  }
}

/** Smoothed Weiszfeld iterations, the estimator Krum exposes as GeometricMedian. */
export function geometricMedian(points: readonly Point[]): Point {
  let center = average(points)
  for (let iteration = 0; iteration < 80; iteration++) {
    let x = 0
    let y = 0
    let weight = 0
    for (const point of points) {
      const inverseDistance = 1 / Math.max(Math.hypot(point.x - center.x, point.y - center.y), 1e-6)
      x += point.x * inverseDistance
      y += point.y * inverseDistance
      weight += inverseDistance
    }
    center = { x: x / weight, y: y / weight }
  }
  return center
}

/** Krum scores over the n - f - 2 closest neighbours, averaged over m = n - 2f - 3 points. */
export function multiKrum(points: readonly Point[], byzantine: number): Point {
  const selectedCount = points.length - 2 * byzantine - 3
  if (selectedCount < 1) return average(points)
  const scores = points.map((point, index) => {
    const distances = points
      .map((other, otherIndex) => otherIndex === index
        ? Number.POSITIVE_INFINITY
        : (point.x - other.x) ** 2 + (point.y - other.y) ** 2)
      .sort((first, second) => first - second)
    return {
      point,
      score: distances
        .slice(0, points.length - byzantine - 2)
        .reduce((sum, distance) => sum + distance, 0)
    }
  })
  return average(
    scores
      .sort((first, second) => first.score - second.score)
      .slice(0, selectedCount)
      .map(({ point }) => point)
  )
}
