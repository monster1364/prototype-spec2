// ============================================================
// Mock Data — prototype-spec2
// 실제 API 호출 없이 프로토타입 렌더링에 사용하는 목업 데이터
// Claude Code가 새 도메인 프로토타입 생성 시 이 파일에 타입과 데이터를 추가합니다.
// ============================================================

// ----- 공통 타입 -----

export type OrderStatus =
  | 'pending'       // 주문 대기
  | 'confirmed'     // 주문 확인
  | 'preparing'     // 준비 중
  | 'shipped'       // 배송 중
  | 'delivered'     // 배송 완료
  | 'cancelled'     // 취소
  | 'refunded'      // 환불 완료

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: '주문 대기',
  confirmed: '주문 확인',
  preparing: '준비 중',
  shipped: '배송 중',
  delivered: '배송 완료',
  cancelled: '취소',
  refunded: '환불 완료',
}

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'bg-gray-100 text-gray-600',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-orange-100 text-orange-700',
}

// ----- OMS 주문 -----

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  status: OrderStatus
  totalAmount: number
  itemCount: number
  createdAt: string
  updatedAt: string
  service: 'gentle-monster' | 'nuflaat' | 'atiissu'
}

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001234',
    customerName: '김민준',
    customerEmail: 'minjun@example.com',
    status: 'confirmed',
    totalAmount: 450000,
    itemCount: 2,
    createdAt: '2024-03-10T09:30:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
    service: 'gentle-monster',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001235',
    customerName: '이서연',
    customerEmail: 'seoyeon@example.com',
    status: 'shipped',
    totalAmount: 280000,
    itemCount: 1,
    createdAt: '2024-03-10T11:15:00Z',
    updatedAt: '2024-03-11T08:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-001236',
    customerName: '박지호',
    customerEmail: 'jiho@example.com',
    status: 'pending',
    totalAmount: 120000,
    itemCount: 3,
    createdAt: '2024-03-11T14:20:00Z',
    updatedAt: '2024-03-11T14:20:00Z',
    service: 'atiissu',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-001237',
    customerName: '최유나',
    customerEmail: 'yuna@example.com',
    status: 'delivered',
    totalAmount: 890000,
    itemCount: 4,
    createdAt: '2024-03-08T16:00:00Z',
    updatedAt: '2024-03-10T15:30:00Z',
    service: 'gentle-monster',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-001238',
    customerName: '정현우',
    customerEmail: 'hyunwoo@example.com',
    status: 'cancelled',
    totalAmount: 75000,
    itemCount: 1,
    createdAt: '2024-03-09T10:00:00Z',
    updatedAt: '2024-03-09T12:00:00Z',
    service: 'nuflaat',
  },
]

// ----- PIM 상품 -----

export type ProductStatus = 'active' | 'inactive' | 'soldout' | 'preparing'

export const PRODUCT_STATUS_LABEL: Record<ProductStatus, string> = {
  active: '판매 중',
  inactive: '비활성',
  soldout: '품절',
  preparing: '준비 중',
}

export const PRODUCT_STATUS_COLOR: Record<ProductStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  soldout: 'bg-red-100 text-red-700',
  preparing: 'bg-yellow-100 text-yellow-700',
}

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  price: number
  stock: number
  status: ProductStatus
  service: 'gentle-monster' | 'nuflaat' | 'atiissu'
  createdAt: string
}

export const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'GM-SS24-001',
    name: 'HEIZER 01 선글라스',
    category: '선글라스',
    price: 380000,
    stock: 45,
    status: 'active',
    service: 'gentle-monster',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    sku: 'GM-SS24-002',
    name: 'PENCE01 안경',
    category: '안경',
    price: 290000,
    stock: 0,
    status: 'soldout',
    service: 'gentle-monster',
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '3',
    sku: 'NF-SS24-001',
    name: '누플랫 캐리어 M',
    category: '캐리어',
    price: 480000,
    stock: 12,
    status: 'active',
    service: 'nuflaat',
    createdAt: '2024-02-01T00:00:00Z',
  },
]

// ----- OMS Order Dashboard -----
// 타입은 features/order-dashboard/models/types.ts 에서 가져옵니다.

import type {
  OrderTab,
  DashboardOrderItem,
  DashboardStatusSection,
} from '@/features/order-dashboard/models/types'

export type { OrderTab, DashboardOrderItem, DashboardStatusSection }

export const mockOrderStatusSections: DashboardStatusSection[] = [
  {
    sectionTitle: 'Order',
    groups: [
      {
        groupLabel: 'Awaiting',
        isFinalized: false,
        subStates: [
          { key: 'order-pending', label: 'Pending', count: 12 },
        ],
      },
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'order-collected', label: 'Collected', count: 8 },
          { key: 'order-partly-confirmed', label: 'Partly confirmed', count: 3 },
          { key: 'order-partial-shipment-requested', label: 'Partial shipment requested', count: 2 },
          { key: 'order-shipment-requested', label: 'Shipment Requested', count: 25 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'order-deleted', label: 'Deleted', count: 1 },
          { key: 'order-canceled', label: 'Canceled', count: 7 },
          { key: 'order-completed', label: 'Completed', count: 143 },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Shipment',
    groups: [
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'shipment-picking-requested', label: 'Picking Requested', count: 18 },
          { key: 'shipment-picked', label: 'Picked', count: 6 },
          { key: 'shipment-packed', label: 'Packed', count: 9 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'shipment-canceled', label: 'Canceled', count: 4 },
          { key: 'shipment-picking-rejected', label: 'Picking Rejected', count: 2 },
          { key: 'shipment-delivered', label: 'Delivered', count: 89 },
          { key: 'shipment-lost', label: 'Lost', count: 0 },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Store Pickup',
    groups: [
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'pickup-shipped', label: 'Shipped', count: 5 },
          { key: 'pickup-prepared', label: 'Prepared', count: 3 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'pickup-completed', label: 'Completed', count: 22 },
          { key: 'pickup-canceled', label: 'Canceled', count: 1 },
        ],
      },
    ],
  },
]

export const mockClaimStatusSections: DashboardStatusSection[] = [
  {
    sectionTitle: 'Return',
    groups: [
      {
        groupLabel: 'Awaiting',
        isFinalized: false,
        subStates: [
          { key: 'return-pending', label: 'Pending', count: 6 },
        ],
      },
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'return-pickup-requested', label: 'Pickup Requested', count: 4 },
          { key: 'return-pickup-ongoing', label: 'Pickup Ongoing', count: 3 },
          { key: 'return-received', label: 'Received', count: 8 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'return-refunded', label: 'Refunded', count: 31 },
          { key: 'return-canceled', label: 'Canceled', count: 2 },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Exchange',
    groups: [
      {
        groupLabel: 'Awaiting',
        isFinalized: false,
        subStates: [
          { key: 'exchange-pending', label: 'Pending', count: 4 },
        ],
      },
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'exchange-pickup-requested', label: 'Pickup Requested', count: 2 },
          { key: 'exchange-pickup-ongoing', label: 'Pickup Ongoing', count: 1 },
          { key: 'exchange-received', label: 'Received', count: 3 },
          { key: 'exchange-inspected', label: 'Inspected', count: 2 },
          { key: 'exchange-shipment-requested', label: 'Shipment Requested', count: 5 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'exchange-exchanged', label: 'Exchanged', count: 19 },
          { key: 'exchange-canceled', label: 'Canceled', count: 3 },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Reshipment',
    groups: [
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'reshipment-picking-requested', label: 'Picking Requested', count: 3 },
          { key: 'reshipment-picked', label: 'Picked', count: 2 },
          { key: 'reshipment-packed', label: 'Packed', count: 4 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'reshipment-canceled', label: 'Canceled', count: 1 },
          { key: 'reshipment-picking-rejected', label: 'Picking Rejected', count: 0 },
          { key: 'reshipment-delivered', label: 'Delivered', count: 14 },
          { key: 'reshipment-lost', label: 'Lost', count: 0 },
        ],
      },
    ],
  },
]

export const mockDashboardItems: DashboardOrderItem[] = [
  // ORDER tab
  { id: 'd001', channel: 'OWN',     orderNo: 'ORD-2026-010001', orderDate: '2026-03-12T09:15:00Z', ordererEmail: 'kim.jiyeon@example.com',   status: 'Pending',             fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '김지연',      tab: 'ORDER', detailStatus: 'order-pending' },
  { id: 'd002', channel: 'Amazon',  orderNo: 'ORD-2026-010002', orderDate: '2026-03-12T10:30:00Z', ordererEmail: 'john.smith@example.com',    status: 'Pending',             fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: 'John Smith',  tab: 'ORDER', detailStatus: 'order-pending' },
  { id: 'd003', channel: 'Shopify', orderNo: 'ORD-2026-010003', orderDate: '2026-03-11T14:20:00Z', ordererEmail: 'park.junho@example.com',    status: 'Collected',           fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '박준호',      tab: 'ORDER', detailStatus: 'order-collected' },
  { id: 'd004', channel: 'Amazon',  orderNo: 'ORD-2026-010004', orderDate: '2026-03-11T17:00:00Z', ordererEmail: 'anna.kim@example.com',      status: 'Partly confirmed',    fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: 'Anna Kim',    tab: 'ORDER', detailStatus: 'order-partly-confirmed' },
  // ORD-010005 has 2 fulfillments — split into 2 rows
  { id: 'd005a', channel: 'OWN',    orderNo: 'ORD-2026-010005', orderDate: '2026-03-11T16:45:00Z', ordererEmail: 'lee.suji@example.com',      status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050051', fulfillmentStatus: 'Picking Requested', recipientName: '이수지',     tab: 'ORDER', detailStatus: 'order-shipment-requested' },
  { id: 'd005b', channel: 'OWN',    orderNo: 'ORD-2026-010005', orderDate: '2026-03-11T16:45:00Z', ordererEmail: 'lee.suji@example.com',      status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050052', fulfillmentStatus: 'Picking Requested', recipientName: '이수지',     tab: 'ORDER', detailStatus: 'order-shipment-requested' },
  { id: 'd006', channel: 'Rakuten', orderNo: 'ORD-2026-010006', orderDate: '2026-03-11T11:00:00Z', ordererEmail: 'tanaka@example.com',        status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050053', fulfillmentStatus: 'Picking Requested', recipientName: '田中一郎',   tab: 'ORDER', detailStatus: 'order-shipment-requested' },
  { id: 'd007', channel: 'LINE',    orderNo: 'ORD-2026-010007', orderDate: '2026-03-10T09:00:00Z', ordererEmail: 'choi.minjung@example.com',  status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050054', fulfillmentStatus: 'Picking Requested', recipientName: '최민정',     tab: 'ORDER', detailStatus: 'order-shipment-requested' },
  { id: 'd008', channel: 'OWN',     orderNo: 'ORD-2026-010008', orderDate: '2026-03-10T13:30:00Z', ordererEmail: 'jung.hyunwoo@example.com',  status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050055', fulfillmentStatus: 'Picking Requested', recipientName: '정현우',     tab: 'ORDER', detailStatus: 'shipment-picking-requested' },
  { id: 'd009', channel: 'Amazon',  orderNo: 'ORD-2026-010009', orderDate: '2026-03-10T15:00:00Z', ordererEmail: 'emily.jones@example.com',   status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050056', fulfillmentStatus: 'Picking Requested', recipientName: 'Emily Jones', tab: 'ORDER', detailStatus: 'shipment-picking-requested' },
  { id: 'd010', channel: 'Shopify', orderNo: 'ORD-2026-010010', orderDate: '2026-03-09T10:00:00Z', ordererEmail: 'oh.sungmin@example.com',    status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050057', fulfillmentStatus: 'Picked',            recipientName: '오성민',     tab: 'ORDER', detailStatus: 'shipment-picked' },
  { id: 'd011', channel: 'OWN',     orderNo: 'ORD-2026-010011', orderDate: '2026-03-09T11:30:00Z', ordererEmail: 'yoon.seoyeon@example.com',  status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050058', fulfillmentStatus: 'Packed',            recipientName: '윤서연',     tab: 'ORDER', detailStatus: 'shipment-packed' },
  { id: 'd012', channel: 'OWN',     orderNo: 'ORD-2026-010012', orderDate: '2026-03-01T09:00:00Z', ordererEmail: 'lim.chaewon@example.com',   status: 'Completed',           fulfillmentNo: 'FUL-2026-050001', fulfillmentStatus: 'Delivered',         recipientName: '임채원',     tab: 'ORDER', detailStatus: 'shipment-delivered' },
  { id: 'd013', channel: 'Amazon',  orderNo: 'ORD-2026-010013', orderDate: '2026-03-02T14:00:00Z', ordererEmail: 'michael.brown@example.com', status: 'Completed',           fulfillmentNo: 'FUL-2026-050002', fulfillmentStatus: 'Delivered',         recipientName: 'Michael Brown', tab: 'ORDER', detailStatus: 'shipment-delivered' },
  { id: 'd014', channel: 'LINE',    orderNo: 'ORD-2026-010014', orderDate: '2026-03-12T08:00:00Z', ordererEmail: 'seo.dahyun@example.com',    status: 'Completed',           fulfillmentNo: 'FUL-2026-050003', fulfillmentStatus: 'Delivered',         recipientName: '서다현',     tab: 'ORDER', detailStatus: 'shipment-delivered' },
  { id: 'd015', channel: 'OWN',     orderNo: 'ORD-2026-010015', orderDate: '2026-03-03T16:00:00Z', ordererEmail: 'han.minji@example.com',     status: 'Completed',           fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '한민지',     tab: 'ORDER', detailStatus: 'order-completed' },
  { id: 'd016', channel: 'Rakuten', orderNo: 'ORD-2026-010016', orderDate: '2026-03-04T08:30:00Z', ordererEmail: 'yamamoto@example.com',      status: 'Completed',           fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '山本花子',   tab: 'ORDER', detailStatus: 'order-completed' },
  { id: 'd017', channel: 'OWN',     orderNo: 'ORD-2026-010017', orderDate: '2026-03-05T12:00:00Z', ordererEmail: 'bae.jungho@example.com',    status: 'Canceled',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '배정호',     tab: 'ORDER', detailStatus: 'order-canceled' },
  { id: 'd018', channel: 'Shopify', orderNo: 'ORD-2026-010018', orderDate: '2026-03-06T15:00:00Z', ordererEmail: 'sarah.lee@example.com',     status: 'Canceled',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: 'Sarah Lee',  tab: 'ORDER', detailStatus: 'order-canceled' },
  { id: 'd019', channel: 'OWN',     orderNo: 'ORD-2026-010019', orderDate: '2026-03-11T10:00:00Z', ordererEmail: 'kwon.hyunjin@example.com',  status: 'Shipped',             fulfillmentNo: 'FUL-2026-050059', fulfillmentStatus: 'Shipped',           recipientName: '권현진',     tab: 'ORDER', detailStatus: 'pickup-shipped' },
  { id: 'd020', channel: 'OWN',     orderNo: 'ORD-2026-010020', orderDate: '2026-03-07T13:00:00Z', ordererEmail: 'moon.jaeho@example.com',    status: 'Completed',           fulfillmentNo: 'FUL-2026-050004', fulfillmentStatus: 'Completed',         recipientName: '문재호',     tab: 'ORDER', detailStatus: 'pickup-completed' },
  // CLAIM tab
  { id: 'c001', channel: 'OWN',     orderNo: 'RET-2026-005001', orderDate: '2026-03-12T09:00:00Z', ordererEmail: 'kim.jiyeon@example.com',    status: 'Pending',             fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '김지연',     tab: 'CLAIM', detailStatus: 'return-pending' },
  { id: 'c002', channel: 'Shopify', orderNo: 'RET-2026-005002', orderDate: '2026-03-11T14:00:00Z', ordererEmail: 'david.park@example.com',    status: 'Pickup Requested',    fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: 'David Park', tab: 'CLAIM', detailStatus: 'return-pickup-requested' },
  { id: 'c003', channel: 'OWN',     orderNo: 'RET-2026-005003', orderDate: '2026-03-10T11:00:00Z', ordererEmail: 'choi.yuri@example.com',     status: 'Received',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '최유리',     tab: 'CLAIM', detailStatus: 'return-received' },
  { id: 'c004', channel: 'OWN',     orderNo: 'RET-2026-005004', orderDate: '2026-03-01T09:00:00Z', ordererEmail: 'kim.nari@example.com',      status: 'Refunded',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '김나리',     tab: 'CLAIM', detailStatus: 'return-refunded' },
  { id: 'c005', channel: 'Amazon',  orderNo: 'RET-2026-005005', orderDate: '2026-03-02T16:00:00Z', ordererEmail: 'tom.wilson@example.com',    status: 'Refunded',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: 'Tom Wilson', tab: 'CLAIM', detailStatus: 'return-refunded' },
  { id: 'c006', channel: 'OWN',     orderNo: 'EXC-2026-003001', orderDate: '2026-03-12T10:00:00Z', ordererEmail: 'park.sunho@example.com',    status: 'Pending',             fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '박선호',     tab: 'CLAIM', detailStatus: 'exchange-pending' },
  { id: 'c007', channel: 'Amazon',  orderNo: 'EXC-2026-003002', orderDate: '2026-03-09T13:00:00Z', ordererEmail: 'jessica.cho@example.com',   status: 'Received',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: 'Jessica Cho', tab: 'CLAIM', detailStatus: 'exchange-received' },
  { id: 'c008', channel: 'OWN',     orderNo: 'EXC-2026-003003', orderDate: '2026-03-11T15:30:00Z', ordererEmail: 'kang.minji@example.com',    status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-060031', fulfillmentStatus: 'Picking Requested', recipientName: '강민지',     tab: 'CLAIM', detailStatus: 'exchange-shipment-requested' },
  { id: 'c009', channel: 'OWN',     orderNo: 'EXC-2026-003004', orderDate: '2026-03-03T11:00:00Z', ordererEmail: 'lee.jaemin@example.com',    status: 'Exchanged',           fulfillmentNo: 'FUL-2026-060010', fulfillmentStatus: 'Delivered',         recipientName: '이재민',     tab: 'CLAIM', detailStatus: 'exchange-exchanged' },
  { id: 'c010', channel: 'Shopify', orderNo: 'RSH-2026-002001', orderDate: '2026-03-11T15:00:00Z', ordererEmail: 'yoon.hyuna@example.com',    status: 'Picking Requested',   fulfillmentNo: 'FUL-2026-070021', fulfillmentStatus: 'Picking Requested', recipientName: '윤현아',     tab: 'CLAIM', detailStatus: 'reshipment-picking-requested' },
  { id: 'c011', channel: 'Amazon',  orderNo: 'RSH-2026-002002', orderDate: '2026-03-04T10:00:00Z', ordererEmail: 'mike.yang@example.com',     status: 'Delivered',           fulfillmentNo: 'FUL-2026-070005', fulfillmentStatus: 'Delivered',         recipientName: 'Mike Yang',  tab: 'CLAIM', detailStatus: 'reshipment-delivered' },
]

// ----- 공통 유틸 -----

export function formatPrice(amount: number): string {
  return amount.toLocaleString('ko-KR') + '원'
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
