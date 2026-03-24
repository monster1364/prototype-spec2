import type { ProductClassification } from '../models/types'

export function formatRevenue(amount: number): string {
  return amount.toLocaleString('ko-KR') + '원'
}

export function formatRevenueShort(amount: number): string {
  if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(1) + '억원'
  if (amount >= 100_000_000) return (amount / 100_000_000).toFixed(1) + '억원'
  if (amount >= 10_000) return (amount / 10_000).toFixed(0) + '만원'
  return amount.toLocaleString('ko-KR') + '원'
}

export function formatDelta(delta: number): string {
  const sign = delta >= 0 ? '▲' : '▼'
  return `${sign}${Math.abs(delta).toFixed(1)}%`
}

export function getDeltaColor(delta: number): string {
  return delta >= 0 ? '#16a34a' : '#dc2626'
}

export function formatRatio(ratio: number): string {
  return ratio.toFixed(1) + '%'
}

export function formatBatchDate(iso: string): string {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} 09:00`
}

export function getClassificationColor(
  cls: ProductClassification
): 'success' | 'error' | 'default' {
  if (cls === 'reorder') return 'success'
  if (cls === 'slow_moving') return 'error'
  return 'default'
}

// SVG Donut 차트 헬퍼
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const gap = 0.5 // 호 사이 간격(도)
  const s = polarToCartesian(cx, cy, r, startAngle + gap)
  const e = polarToCartesian(cx, cy, r, endAngle - gap)
  const largeArc = endAngle - startAngle - gap * 2 > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`
}

// 비율 배열 → 누적 각도 배열 반환
export function ratiosToAngles(ratios: number[]): { start: number; end: number }[] {
  const total = ratios.reduce((a, b) => a + b, 0)
  const result: { start: number; end: number }[] = []
  let current = 0
  for (const r of ratios) {
    const deg = (r / total) * 360
    result.push({ start: current, end: current + deg })
    current += deg
  }
  return result
}
