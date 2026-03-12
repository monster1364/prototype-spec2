// ============================================================
// Order Dashboard — 유틸리티 함수
// 실제 프로젝트에서는 도메인별 데이터 변환/포맷 로직이 여기 정의됩니다.
// ============================================================

export function formatUpdatedAt(iso: string): string {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

export function formatTableDate(iso: string): string {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

export function getSubStateCountColor(groupLabel: string, label: string): string {
  if (groupLabel === 'Awaiting') return '#1565c0'
  if (groupLabel === 'In Progress') return '#e65100'
  const lower = label.toLowerCase()
  if (['completed', 'delivered', 'refunded', 'exchanged'].some((s) => lower.includes(s)))
    return '#2e7d32'
  if (lower.includes('deleted')) return '#9e9e9e'
  return '#c62828'
}

export function getStatusChipProps(detailStatus: string): {
  color: 'default' | 'primary' | 'success' | 'error' | 'warning'
} {
  if (detailStatus.includes('pending')) return { color: 'primary' }
  if (
    detailStatus.includes('canceled') ||
    detailStatus.includes('rejected') ||
    detailStatus.includes('lost')
  )
    return { color: 'error' }
  if (detailStatus.includes('deleted')) return { color: 'default' }
  if (
    detailStatus.includes('delivered') ||
    detailStatus.includes('completed') ||
    detailStatus.includes('refunded') ||
    detailStatus.includes('exchanged')
  )
    return { color: 'success' }
  return { color: 'warning' }
}

export function groupTotal(subStates: { count: number }[]): number {
  return subStates.reduce((sum, s) => sum + s.count, 0)
}
