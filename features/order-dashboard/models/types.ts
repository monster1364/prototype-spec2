// ============================================================
// Order Dashboard — 도메인 타입 정의
// 실제 프로젝트에서는 API 응답 타입 및 도메인 모델이 여기 정의됩니다.
// ============================================================

export type OrderTab = 'ORDER' | 'CLAIM'

export interface DashboardOrderItem {
  id: string
  channel: string
  orderNo: string
  orderDate: string
  ordererEmail: string
  status: string
  fulfillmentNo: string
  fulfillmentStatus: string
  recipientName: string
  tab: OrderTab
  detailStatus: string
}

export interface DashboardSubState {
  key: string
  label: string
  count: number
}

export interface DashboardStatusGroup {
  groupLabel: string
  isFinalized: boolean
  subStates: DashboardSubState[]
}

export interface DashboardStatusSection {
  sectionTitle: string
  groups: DashboardStatusGroup[]
}
