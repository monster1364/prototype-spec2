// ============================================================
// Sales Dashboard — 도메인 타입 정의
// ============================================================

export type PeriodUnit = 'daily' | 'monthly' | 'yearly'

export interface SalesDashboardKPI {
  totalRevenue: number
  totalRevenueDelta: number      // 전기간 대비 증감률 (%)
  totalOrders: number
  totalOrdersDelta: number
  aov: number                    // 평균 주문 금액
  aovDelta: number
  conversionRate: number         // 구매 전환율 (%)
  conversionRateDelta: number
  salesLoss: number              // 판매 로스 금액 (재고 부족 등으로 인한 기회 손실)
  salesLossDelta: number         // 음수 = 로스 감소 (개선)
  restockAlertCount: number      // 재입고 알림신청 수
  restockAlertDelta: number
}

export interface SalesChannelData {
  online: number
  offline: number
  gift: number
  giftOrderCount: number
  giftRatio: number              // 선물하기 비중 (%)
}

export interface SalesTrendItem {
  label: string                  // X축 표시값 (예: "2025-03", "2024")
  revenue: number
  revenuePrevYear: number
}

export interface CategorySales {
  category: string
  revenue: number
  quantity: number
}

export interface CollectionSales {
  rank: number
  collection: string
  revenue: number
  quantity: number
  deltaRate: number              // 전기간 대비 증감률 (%)
}

export type ProductClassification = 'opportunity' | 'risk' | 'normal'

export interface ProductPerformanceItem {
  rank: number
  productName: string
  category: string
  quantity: number
  revenue: number
  salesVelocity: number          // 일 평균 판매 수량
  conversionRate: number         // %
  currentStock: number           // 현재고
  sellThroughRate: number        // 소진율 (%)
  daysToSellOut: number | null   // 소진예상일 (null = 판매 없음)
  classification: ProductClassification
}

export interface SalesInventoryItem {
  productName: string
  category: string
  currentStock: number
  sellThroughRate: number        // %
  daysToSellOut: number          // 일
  salesVelocity: number          // 일평균 판매량
}

export interface InboundItem {
  productName: string
  category: string
  inboundQty: number
  expectedDate: string           // YYYY-MM-DD
  inboundType: 'restock' | 'new'
}

export interface RestockAlertItem {
  productName: string
  category: string
  alertCount: number             // 재입고 알림신청 누적 건수 (더미 · 알림 시스템 연동 필요)
  currentStock: number           // 현재고 (더미 · WMS 연동 필요)
  daysToSellOut: number          // 소진예상일
}

export interface DtcMtcSummary {
  dtcRevenue: number             // DTC(자사몰) 매출
  dtcRatio: number               // %
  mtcRevenue: number             // MTC(멀티채널) 매출
  mtcRatio: number               // %
  dtcOrderCount: number
  mtcOrderCount: number
}

export interface CustomerAnalysisData {
  newCustomers: number
  repeatCustomers: number
  newRatio: number               // %
  repeatRatio: number            // %
  totalCustomers: number
  cartAddCount: number
  wishlistAddCount: number
}

// ── 주문 인사이트 (5.6) — 실데이터 기반 ──────────────────────────

export interface BestsellerItem {
  rank: number
  productName: string
  orderCount: number             // OMS 실데이터
  revenue: number                // 더미
  cancelCount: number            // OMS 실데이터
  cancelRate: number             // %
}

export interface CancelReasonItem {
  reason: string
  count: number
  ratio: number                  // %
}

export interface OrderPatternData {
  giftCount: number              // OMS 실데이터
  normalCount: number            // OMS 실데이터
  giftRatio: number              // %
  cancelCount: number
  cancelRate: number
  cancelReasons: CancelReasonItem[]
}

// ── 마케팅 채널 성과 (5.7) — 더미 데이터 ─────────────────────────

export interface MarketingChannelItem {
  channel: string                // Organic / Paid Search / SNS / Email / Direct
  sessions: number
  orders: number
  revenue: number
  conversionRate: number         // %
  roas?: number                  // 광고 채널만
}

export interface CampaignItem {
  name: string
  channel: string
  period: string                 // YYYY-MM
  spend: number
  revenue: number
  roas: number
  orders: number
}

export interface MarketingKPI {
  totalRoas: number
  adRevenue: number
  adSpend: number
  adOrders: number
  adRevenueDelta: number
  roasDelta: number
}
