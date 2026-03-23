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
    sku: 'NF-NAIL-001',
    name: 'Nail 커틀러리 5P 세트',
    category: '커틀러리',
    price: 168000,
    stock: 45,
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

// ----- Sales Dashboard -----
// 타입은 features/sales-dashboard/models/types.ts 에서 가져옵니다.

import type {
  SalesDashboardKPI,
  SalesChannelData,
  SalesTrendItem,
  CategorySales,
  CollectionSales,
  ProductPerformanceItem,
  CustomerAnalysisData,
  SalesInventoryItem,
  InboundItem,
  DtcMtcSummary,
} from '@/features/sales-dashboard/models/types'

export type {
  SalesDashboardKPI,
  SalesChannelData,
  SalesTrendItem,
  CategorySales,
  CollectionSales,
  ProductPerformanceItem,
  CustomerAnalysisData,
  SalesInventoryItem,
  InboundItem,
  DtcMtcSummary,
}

export const mockSalesKPI: SalesDashboardKPI = {
  totalRevenue: 1_245_800_000,
  totalRevenueDelta: 12.3,
  totalOrders: 3842,
  totalOrdersDelta: 8.7,
  aov: 324_200,
  aovDelta: 3.2,
  conversionRate: 4.7,
  conversionRateDelta: -0.3,
  salesLoss: 48_200_000,
  salesLossDelta: -15.4,
  restockAlertCount: 312,
  restockAlertDelta: 28.6,
}

export const mockSalesChannelData: SalesChannelData = {
  online: 748_000_000,
  offline: 422_000_000,
  gift: 75_800_000,
  giftOrderCount: 234,
  giftRatio: 6.1,
}

export const mockSalesTrend: SalesTrendItem[] = [
  { label: '2025-04', revenue: 980_000_000,   revenuePrevYear: 850_000_000 },
  { label: '2025-05', revenue: 1_020_000_000, revenuePrevYear: 890_000_000 },
  { label: '2025-06', revenue: 1_140_000_000, revenuePrevYear: 960_000_000 },
  { label: '2025-07', revenue: 1_080_000_000, revenuePrevYear: 920_000_000 },
  { label: '2025-08', revenue: 1_060_000_000, revenuePrevYear: 905_000_000 },
  { label: '2025-09', revenue: 1_190_000_000, revenuePrevYear: 1_010_000_000 },
  { label: '2025-10', revenue: 1_320_000_000, revenuePrevYear: 1_150_000_000 },
  { label: '2025-11', revenue: 1_480_000_000, revenuePrevYear: 1_280_000_000 },
  { label: '2025-12', revenue: 1_650_000_000, revenuePrevYear: 1_420_000_000 },
  { label: '2026-01', revenue: 1_105_000_000, revenuePrevYear: 980_000_000 },
  { label: '2026-02', revenue: 1_180_000_000, revenuePrevYear: 1_050_000_000 },
  { label: '2026-03', revenue: 1_245_800_000, revenuePrevYear: 1_108_000_000 },
]

export const mockCategorySales: CategorySales[] = [
  { category: '커틀러리',      revenue: 685_000_000, quantity: 6840 },
  { category: '세라믹',        revenue: 249_000_000, quantity: 1820 },
  { category: '테이블 액세서리', revenue: 187_000_000, quantity: 2140 },
  { category: '글라스웨어',    revenue: 124_800_000, quantity: 1540 },
]

export const mockCollectionSales: CollectionSales[] = [
  { rank: 1, collection: 'Nail',    revenue: 428_000_000, quantity: 3240, deltaRate:  22.4 },
  { rank: 2, collection: 'Line',    revenue: 312_000_000, quantity: 2880, deltaRate:   8.1 },
  { rank: 3, collection: 'Wave',    revenue: 218_000_000, quantity: 1620, deltaRate:  15.7 },
  { rank: 4, collection: 'Straight', revenue: 142_000_000, quantity: 980, deltaRate:  -3.2 },
  { rank: 5, collection: 'Pattern', revenue:  82_000_000, quantity: 740,  deltaRate:  31.4 },
  { rank: 6, collection: 'Mini',    revenue:  38_400_000, quantity: 920,  deltaRate:  -8.6 },
  { rank: 7, collection: 'Office',  revenue:  14_600_000, quantity: 280,  deltaRate: -18.2 },
  { rank: 8, collection: 'Fashion', revenue:  10_800_000, quantity: 196,  deltaRate: -24.5 },
]

export const mockProductPerformance: ProductPerformanceItem[] = [
  { rank: 1,  productName: 'Nail 커틀러리 5P 세트',      category: '커틀러리',      quantity: 810,  revenue: 136_080_000, salesVelocity: 27.0, conversionRate: 7.8, currentStock: 45,  sellThroughRate: 94.7, daysToSellOut: 2,   classification: 'opportunity' },
  { rank: 2,  productName: 'Line 디너 수저 세트 2P',     category: '커틀러리',      quantity: 680,  revenue:  48_960_000, salesVelocity: 22.7, conversionRate: 5.4, currentStock: 120, sellThroughRate: 85.0, daysToSellOut: 5,   classification: 'opportunity' },
  { rank: 3,  productName: 'Wave 세라믹 볼 세트 2P',     category: '세라믹',        quantity: 542,  revenue:  41_192_000, salesVelocity: 18.1, conversionRate: 6.2, currentStock: 38,  sellThroughRate: 93.4, daysToSellOut: 2,   classification: 'opportunity' },
  { rank: 4,  productName: 'Nail 디너 포크 2P',         category: '커틀러리',      quantity: 498,  revenue:  28_884_000, salesVelocity: 16.6, conversionRate: 4.9, currentStock: 95,  sellThroughRate: 83.9, daysToSellOut: 6,   classification: 'opportunity' },
  { rank: 5,  productName: 'Straight 커틀러리 4P 세트',  category: '커틀러리',      quantity: 430,  revenue:  60_200_000, salesVelocity: 14.3, conversionRate: 4.1, currentStock: 140, sellThroughRate: 75.4, daysToSellOut: 10,  classification: 'normal' },
  { rank: 6,  productName: 'Line 디너 포크 2P',         category: '커틀러리',      quantity: 390,  revenue:  17_940_000, salesVelocity: 13.0, conversionRate: 5.7, currentStock: 88,  sellThroughRate: 81.6, daysToSellOut: 7,   classification: 'opportunity' },
  { rank: 7,  productName: 'Nail 디너 나이프 2P',        category: '커틀러리',      quantity: 362,  revenue:  23_168_000, salesVelocity: 12.1, conversionRate: 3.8, currentStock: 110, sellThroughRate: 76.7, daysToSellOut: 9,   classification: 'normal' },
  { rank: 8,  productName: 'Pattern 세라믹 플레이트',    category: '세라믹',        quantity: 310,  revenue:  13_950_000, salesVelocity: 10.3, conversionRate: 5.2, currentStock: 76,  sellThroughRate: 80.3, daysToSellOut: 7,   classification: 'normal' },
  { rank: 9,  productName: 'Nail 티스푼 4P',            category: '커틀러리',      quantity: 288,  revenue:  13_824_000, salesVelocity: 9.6,  conversionRate: 3.2, currentStock: 65,  sellThroughRate: 81.6, daysToSellOut: 7,   classification: 'normal' },
  { rank: 10, productName: 'Wave 디너 포크 2P',         category: '커틀러리',      quantity: 262,  revenue:  13_624_000, salesVelocity: 8.7,  conversionRate: 3.0, currentStock: 98,  sellThroughRate: 72.8, daysToSellOut: 11,  classification: 'normal' },
  { rank: 11, productName: 'Office 수저 세트 3P',       category: '커틀러리',      quantity: 240,  revenue:  20_160_000, salesVelocity: 8.0,  conversionRate: 2.8, currentStock: 82,  sellThroughRate: 74.5, daysToSellOut: 10,  classification: 'normal' },
  { rank: 12, productName: 'Mini 티스푼 6P',            category: '커틀러리',      quantity: 218,  revenue:  12_208_000, salesVelocity: 7.3,  conversionRate: 2.5, currentStock: 54,  sellThroughRate: 80.1, daysToSellOut: 7,   classification: 'normal' },
  { rank: 13, productName: 'Pattern 볼 세트 2P',        category: '세라믹',        quantity: 184,  revenue:  12_512_000, salesVelocity: 6.1,  conversionRate: 2.2, currentStock: 42,  sellThroughRate: 81.4, daysToSellOut: 7,   classification: 'normal' },
  { rank: 14, productName: 'Fashion 트레이',            category: '테이블 액세서리', quantity: 142, revenue:   9_230_000, salesVelocity: 4.7,  conversionRate: 1.9, currentStock: 38,  sellThroughRate: 78.9, daysToSellOut: 8,   classification: 'normal' },
  { rank: 15, productName: 'Straight 버터 나이프 2P',   category: '커틀러리',      quantity: 120,  revenue:   6_240_000, salesVelocity: 4.0,  conversionRate: 1.5, currentStock: 32,  sellThroughRate: 78.9, daysToSellOut: 8,   classification: 'normal' },
  { rank: 16, productName: 'Fashion 냅킨 링 4P (단종 예정)', category: '테이블 액세서리', quantity: 28, revenue: 1_344_000, salesVelocity: 0.9,  conversionRate: 0.8, currentStock: 89,  sellThroughRate: 23.9, daysToSellOut: 99,  classification: 'risk' },
  { rank: 17, productName: 'Office 스푼 2P (구형)',     category: '커틀러리',      quantity: 18,   revenue:    756_000,  salesVelocity: 0.6,  conversionRate: 0.6, currentStock: 62,  sellThroughRate: 22.5, daysToSellOut: 103, classification: 'risk' },
  { rank: 18, productName: 'Line 글라스 2P',            category: '글라스웨어',    quantity: 10,   revenue:    580_000,  salesVelocity: 0.3,  conversionRate: 0.4, currentStock: 48,  sellThroughRate: 17.2, daysToSellOut: 160, classification: 'risk' },
  { rank: 19, productName: 'Mini 버터 나이프 2P (단종)', category: '커틀러리',      quantity: 6,    revenue:    228_000,  salesVelocity: 0.2,  conversionRate: 0.3, currentStock: 28,  sellThroughRate: 17.6, daysToSellOut: 140, classification: 'risk' },
  { rank: 20, productName: 'Straight 케이크 서버 (단종)', category: '커틀러리',     quantity: 0,    revenue:          0, salesVelocity: 0.0,  conversionRate: 0.0, currentStock: 15,  sellThroughRate:  0.0, daysToSellOut: null, classification: 'risk' },
]

export const mockSalesInventory: SalesInventoryItem[] = [
  { productName: 'Nail 커틀러리 5P 세트',  category: '커틀러리', currentStock: 45, sellThroughRate: 94.7, daysToSellOut: 2, salesVelocity: 27.0 },
  { productName: 'Wave 세라믹 볼 세트 2P', category: '세라믹',   currentStock: 38, sellThroughRate: 93.4, daysToSellOut: 2, salesVelocity: 18.1 },
  { productName: 'Nail 디너 포크 2P',      category: '커틀러리', currentStock: 95, sellThroughRate: 83.9, daysToSellOut: 6, salesVelocity: 16.6 },
  { productName: 'Line 디너 수저 세트 2P', category: '커틀러리', currentStock: 120, sellThroughRate: 85.0, daysToSellOut: 5, salesVelocity: 22.7 },
  { productName: 'Line 디너 포크 2P',      category: '커틀러리', currentStock: 88, sellThroughRate: 81.6, daysToSellOut: 7, salesVelocity: 13.0 },
]

export const mockInboundItems: InboundItem[] = [
  { productName: 'Nail 커틀러리 5P 세트',  category: '커틀러리', inboundQty: 300, expectedDate: '2026-03-25', inboundType: 'restock' },
  { productName: 'Wave 세라믹 볼 세트 2P', category: '세라믹',   inboundQty: 150, expectedDate: '2026-03-27', inboundType: 'restock' },
  { productName: 'SS25 Wave 글라스 2P',    category: '글라스웨어', inboundQty: 200, expectedDate: '2026-04-02', inboundType: 'new' },
  { productName: 'Nail 디너 포크 2P',      category: '커틀러리', inboundQty: 180, expectedDate: '2026-04-05', inboundType: 'restock' },
  { productName: 'Pattern 세라믹 머그',    category: '세라믹',   inboundQty: 120, expectedDate: '2026-04-10', inboundType: 'new' },
]

export const mockDtcMtcSummary: DtcMtcSummary = {
  dtcRevenue: 520_000_000,
  dtcRatio: 41.7,
  mtcRevenue: 423_800_000,
  mtcRatio: 34.0,
  dtcOrderCount: 1620,
  mtcOrderCount: 1180,
}

export const mockCustomerAnalysis: CustomerAnalysisData = {
  newCustomers: 1204,
  repeatCustomers: 747,
  newRatio: 61.6,
  repeatRatio: 38.4,
  totalCustomers: 1951,
  cartAddCount: 8420,
  wishlistAddCount: 5130,
}

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
