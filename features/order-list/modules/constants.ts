import type { OrderListStatus, OrderShippingStatus } from '@/mock-data'
import type { SearchType } from '../models/types'

export const ORDER_LIST_STATUSES: OrderListStatus[] = [
  'Pending',
  'Collected',
  'Partly Confirmed',
  'Partial Shipment Requested',
  'Shipment Requested',
  'Completed',
  'Canceled',
  'Deleted',
]

export const SHIPPING_STATUSES: OrderShippingStatus[] = [
  'Picking Requested',
  'Picking Rejected',
  'Picked',
  'Packed',
  'Shipped',
  'Delivered',
  'Canceled',
]

export const ORDER_STATUS_CHIP_COLOR: Record<
  OrderListStatus,
  { bg: string; color: string }
> = {
  Pending:                    { bg: '#F3F4F6', color: '#6B7280' },
  Collected:                  { bg: '#DBEAFE', color: '#1D4ED8' },
  'Partly Confirmed':         { bg: '#FEF3C7', color: '#92400E' },
  'Partial Shipment Requested': { bg: '#FFEDD5', color: '#C2410C' },
  'Shipment Requested':       { bg: '#EDE9FE', color: '#6D28D9' },
  Completed:                  { bg: '#D1FAE5', color: '#065F46' },
  Canceled:                   { bg: '#FEE2E2', color: '#991B1B' },
  Deleted:                    { bg: '#E5E7EB', color: '#374151' },
}

export const SHIPPING_STATUS_CHIP_COLOR: Record<
  OrderShippingStatus,
  { bg: string; color: string }
> = {
  'Picking Requested': { bg: '#E0F2FE', color: '#0369A1' },
  'Picking Rejected':  { bg: '#FEE2E2', color: '#991B1B' },
  Picked:              { bg: '#DBEAFE', color: '#1D4ED8' },
  Packed:              { bg: '#CCFBF1', color: '#0F766E' },
  Shipped:             { bg: '#EDE9FE', color: '#6D28D9' },
  Delivered:           { bg: '#D1FAE5', color: '#065F46' },
  Canceled:            { bg: '#FEE2E2', color: '#991B1B' },
}

export const SEARCH_TYPE_OPTIONS: { value: SearchType; label: string }[] = [
  { value: 'orderId',      label: 'Order No' },
  { value: 'ordererName',  label: 'Orderer Name' },
  { value: 'ordererEmail', label: 'Orderer Email' },
  { value: 'ordererPhone', label: 'Orderer Phone' },
]
