import type { OrderListStatus, OrderShippingStatus, OrderChannel } from '@/mock-data'

export type SearchType = 'orderId' | 'ordererName' | 'ordererEmail' | 'ordererPhone'

export interface FilterState {
  searchType: SearchType
  searchKeyword: string
  orderStatuses: OrderListStatus[]
  shippingStatuses: OrderShippingStatus[]
  channels: OrderChannel[]
  startDate: string // YYYY-MM-DD
  endDate: string   // YYYY-MM-DD
}

export function defaultFilterState(): FilterState {
  const today = new Date().toISOString().slice(0, 10)
  return {
    searchType: 'orderId',
    searchKeyword: '',
    orderStatuses: [],
    shippingStatuses: [],
    channels: [],
    startDate: today,
    endDate: today,
  }
}
