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
