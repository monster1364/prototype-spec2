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
    orderNumber: 'NF26031903KOM0SCZX',
    customerName: '오주은',
    customerEmail: 'bighamster27@naver.com',
    status: 'delivered',
    totalAmount: 59000,
    itemCount: 1,
    createdAt: '2026-03-19T09:00:00Z',
    updatedAt: '2026-03-21T14:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '2',
    orderNumber: 'NF26031001UTJ0WCIH',
    customerName: '육주은',
    customerEmail: 'fogbow.juni@gmail.com',
    status: 'delivered',
    totalAmount: 59000,
    itemCount: 1,
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-13T15:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '3',
    orderNumber: 'NF26010504WY00EOP8',
    customerName: '이준후',
    customerEmail: 'gmpm1team@gmail.com',
    status: 'shipped',
    totalAmount: 19000,
    itemCount: 1,
    createdAt: '2026-01-05T09:00:00Z',
    updatedAt: '2026-01-07T10:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '4',
    orderNumber: 'NF26011604JQE0YC5G',
    customerName: '임영록',
    customerEmail: 'xotrs1@gmail.com',
    status: 'preparing',
    totalAmount: 11000,
    itemCount: 1,
    createdAt: '2026-01-16T10:00:00Z',
    updatedAt: '2026-01-16T10:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '5',
    orderNumber: 'NF26030604XKX0YWQ1',
    customerName: '오주은',
    customerEmail: 'bighamster27@naver.com',
    status: 'confirmed',
    totalAmount: 11000,
    itemCount: 1,
    createdAt: '2026-03-06T10:00:00Z',
    updatedAt: '2026-03-06T10:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '6',
    orderNumber: 'NF260303044MQ0HI5J',
    customerName: '오주은',
    customerEmail: 'bighamster27@naver.com',
    status: 'confirmed',
    totalAmount: 52000,
    itemCount: 1,
    createdAt: '2026-03-03T09:00:00Z',
    updatedAt: '2026-03-03T09:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '7',
    orderNumber: 'NF26030406KYL0540J',
    customerName: '윤석주',
    customerEmail: 'monster1354@gentlemonster.com',
    status: 'confirmed',
    totalAmount: 11000,
    itemCount: 1,
    createdAt: '2026-03-04T09:00:00Z',
    updatedAt: '2026-03-04T09:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '8',
    orderNumber: 'NF26032303WDR13HIC',
    customerName: '오주은',
    customerEmail: 'bighamster27@naver.com',
    status: 'pending',
    totalAmount: 21000,
    itemCount: 1,
    createdAt: '2026-03-23T09:00:00Z',
    updatedAt: '2026-03-23T09:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '9',
    orderNumber: 'NF2603190ID9810ZXR',
    customerName: '오주은',
    customerEmail: 'bighamster27@naver.com',
    status: 'pending',
    totalAmount: 24000,
    itemCount: 1,
    createdAt: '2026-03-20T09:00:00Z',
    updatedAt: '2026-03-20T09:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '10',
    orderNumber: 'NF26012201A7S0EYZ6',
    customerName: '최지원',
    customerEmail: 'show1515@naver.com',
    status: 'refunded',
    totalAmount: 176000,
    itemCount: 16,
    createdAt: '2026-01-22T09:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '11',
    orderNumber: 'NF26022704EHS0GRIF',
    customerName: '박대길',
    customerEmail: 'wnstnwl@naver.com',
    status: 'confirmed',
    totalAmount: 24000,
    itemCount: 1,
    createdAt: '2026-02-27T10:00:00Z',
    updatedAt: '2026-02-27T10:00:00Z',
    service: 'nuflaat',
  },
  {
    id: '12',
    orderNumber: 'NF26010600IQ103WGA',
    customerName: '강희영',
    customerEmail: 'gmldud8100@naver.com',
    status: 'shipped',
    totalAmount: 19000,
    itemCount: 1,
    createdAt: '2026-01-06T09:00:00Z',
    updatedAt: '2026-01-08T11:00:00Z',
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
  { id: '1',  sku: 'B00000023', name: '네일 에스프레소',        category: '드링크웨어',     price: 68000,  stock: 42,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '2',  sku: 'B00000022', name: '네일 카푸치노',          category: '드링크웨어',     price: 78000,  stock: 38,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '3',  sku: 'S17000196', name: '네일 포크',              category: '커틀러리',       price: 58000,  stock: 65,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '4',  sku: 'B00000029', name: '라인 카푸치노 베이지',   category: '드링크웨어',     price: 42000,  stock: 90,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '5',  sku: 'B00000027', name: '라인 에스프레소 베이지', category: '드링크웨어',     price: 40000,  stock: 75,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '6',  sku: 'B00000089', name: '웨이브 레스트 2P 세트', category: '다이닝웨어', price: 18000,  stock: 120, status: 'active',    service: 'nuflaat', createdAt: '2025-09-05T00:00:00Z' },
  { id: '7',  sku: 'B00000081', name: '하프 웨이브 포크 세트', category: '다이닝웨어', price: 53000,  stock: 55,  status: 'active',    service: 'nuflaat', createdAt: '2025-09-05T00:00:00Z' },
  { id: '8',  sku: 'B00000093', name: '미니 디저트 스푼 세트', category: '커틀러리',       price: 33000,  stock: 88,  status: 'active',    service: 'nuflaat', createdAt: '2025-09-05T00:00:00Z' },
  { id: '9',  sku: 'B00000092', name: '미니 디저트 듀오 세트', category: '커틀러리',       price: 33000,  stock: 72,  status: 'active',    service: 'nuflaat', createdAt: '2025-09-05T00:00:00Z' },
  { id: '10', sku: 'B00000090', name: '크래커 듀오 세트',      category: '커틀러리',       price: 24000,  stock: 44,  status: 'active',    service: 'nuflaat', createdAt: '2025-09-05T00:00:00Z' },
  { id: '11', sku: 'S17000137', name: '힐 커터',               category: '다이닝웨어', price: 108000, stock: 28,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '12', sku: 'S17000136', name: '립스틱 오프너',          category: '다이닝웨어', price: 48000,  stock: 36,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '13', sku: 'B00000078', name: 'SD카드',                category: '다이닝웨어', price: 52000,  stock: 30,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '14', sku: 'S17000199', name: '펜슬 스푼',              category: '커틀러리',       price: 28000,  stock: 58,  status: 'active',    service: 'nuflaat', createdAt: '2025-01-01T00:00:00Z' },
  { id: '15', sku: 'B00000088', name: '링 디저트 세트',        category: '커틀러리',       price: 28000,  stock: 0,   status: 'soldout',   service: 'nuflaat', createdAt: '2025-09-05T00:00:00Z' },
  { id: '16', sku: 'B00000094', name: '닷 듀오 세트 블랙',     category: '커틀러리',       price: 23000,  stock: 150, status: 'active',    service: 'nuflaat', createdAt: '2025-12-22T00:00:00Z' },
  { id: '17', sku: 'B00000091', name: '너드 디저트 세트',      category: '커틀러리',       price: 18000,  stock: 95,  status: 'active',    service: 'nuflaat', createdAt: '2025-09-05T00:00:00Z' },
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
          { key: 'order-pending', label: 'Pending', count: 7 },
        ],
      },
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'order-collected', label: 'Collected', count: 0 },
          { key: 'order-partly-confirmed', label: 'Partly confirmed', count: 0 },
          { key: 'order-partial-shipment-requested', label: 'Partial shipment requested', count: 13 },
          { key: 'order-shipment-requested', label: 'Shipment Requested', count: 93 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'order-deleted', label: 'Deleted', count: 314 },
          { key: 'order-canceled', label: 'Canceled', count: 194 },
          { key: 'order-completed', label: 'Completed', count: 25 },
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
          { key: 'shipment-picking-requested', label: 'Picking Requested', count: 76 },
          { key: 'shipment-picked', label: 'Picked', count: 0 },
          { key: 'shipment-packed', label: 'Packed', count: 0 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'shipment-canceled', label: 'Canceled', count: 0 },
          { key: 'shipment-picking-rejected', label: 'Picking Rejected', count: 3 },
          { key: 'shipment-delivered', label: 'Delivered', count: 23 },
          { key: 'shipment-lost', label: 'Lost', count: 8 },
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
          { key: 'pickup-shipped', label: 'Shipped', count: 15 },
          { key: 'pickup-ongoing', label: 'Pickup Ongoing', count: 27 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'pickup-completed', label: 'Completed', count: 0 },
          { key: 'pickup-canceled', label: 'Canceled', count: 0 },
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
          { key: 'return-pending', label: 'Pending', count: 0 },
        ],
      },
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'return-pickup-requested', label: 'Pickup Requested', count: 0 },
          { key: 'return-pickup-ongoing', label: 'Pickup Ongoing', count: 0 },
          { key: 'return-received', label: 'Received', count: 0 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'return-refunded', label: 'Refunded', count: 8 },
          { key: 'return-canceled', label: 'Canceled', count: 0 },
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
          { key: 'exchange-pending', label: 'Pending', count: 0 },
        ],
      },
      {
        groupLabel: 'In Progress',
        isFinalized: false,
        subStates: [
          { key: 'exchange-pickup-requested', label: 'Pickup Requested', count: 0 },
          { key: 'exchange-pickup-ongoing', label: 'Pickup Ongoing', count: 0 },
          { key: 'exchange-received', label: 'Received', count: 0 },
          { key: 'exchange-inspected', label: 'Inspected', count: 0 },
          { key: 'exchange-shipment-requested', label: 'Shipment Requested', count: 0 },
        ],
      },
      {
        groupLabel: 'Finalized',
        isFinalized: true,
        subStates: [
          { key: 'exchange-exchanged', label: 'Exchanged', count: 1 },
          { key: 'exchange-canceled', label: 'Canceled', count: 0 },
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
  { id: 'd001', channel: 'OWN',     orderNo: 'NF26032303WDR13HIC', orderDate: '2026-03-23T09:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Pending',             fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '오*은',      tab: 'ORDER', detailStatus: 'order-pending' },
  { id: 'd002', channel: 'OWN',     orderNo: 'NF2603190ID9810ZXR', orderDate: '2026-03-20T09:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Pending',             fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '오*은',      tab: 'ORDER', detailStatus: 'order-pending' },
  { id: 'd003', channel: 'OWN',     orderNo: 'NF26031001X0P03VC9', orderDate: '2026-03-10T10:00:00Z', ordererEmail: 'fogbow.juni@gmail.com',         status: 'Collected',           fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '육*은',      tab: 'ORDER', detailStatus: 'order-collected' },
  { id: 'd004', channel: 'OWN',     orderNo: 'NF26011204F720G3WE', orderDate: '2026-01-12T10:00:00Z', ordererEmail: 'show1515@naver.com',            status: 'Partly confirmed',    fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '최*원',      tab: 'ORDER', detailStatus: 'order-partly-confirmed' },
  // NF26030604XKX0YWQ1 has 2 fulfillments — split into 2 rows
  { id: 'd005a', channel: 'OWN',    orderNo: 'NF26030604XKX0YWQ1', orderDate: '2026-03-06T10:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050051', fulfillmentStatus: 'Picking Requested', recipientName: '오*은',      tab: 'ORDER', detailStatus: 'order-shipment-requested' },
  { id: 'd005b', channel: 'OWN',    orderNo: 'NF26030604XKX0YWQ1', orderDate: '2026-03-06T10:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050052', fulfillmentStatus: 'Picking Requested', recipientName: '오*은',      tab: 'ORDER', detailStatus: 'order-shipment-requested' },
  { id: 'd006', channel: 'OWN',     orderNo: 'NF26030406KYL0540J', orderDate: '2026-03-04T09:00:00Z', ordererEmail: 'monster1354@gentlemonster.com', status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050053', fulfillmentStatus: 'Picking Requested', recipientName: '윤*주',      tab: 'ORDER', detailStatus: 'order-shipment-requested' },
  { id: 'd007', channel: 'OWN',     orderNo: 'NF260303044MQ0HI5J', orderDate: '2026-03-03T09:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050054', fulfillmentStatus: 'Picking Requested', recipientName: '오*은',      tab: 'ORDER', detailStatus: 'order-shipment-requested' },
  { id: 'd008', channel: 'OWN',     orderNo: 'NF26022704EHS0GRIF', orderDate: '2026-02-27T10:00:00Z', ordererEmail: 'wnstnwl@naver.com',             status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050055', fulfillmentStatus: 'Picking Requested', recipientName: '박*길',      tab: 'ORDER', detailStatus: 'shipment-picking-requested' },
  { id: 'd009', channel: 'OWN',     orderNo: 'NF26021101VPH0SFLC', orderDate: '2026-02-11T10:00:00Z', ordererEmail: 'xotrs1@gmail.com',              status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050056', fulfillmentStatus: 'Picking Requested', recipientName: '임*록',      tab: 'ORDER', detailStatus: 'shipment-picking-requested' },
  { id: 'd010', channel: 'OWN',     orderNo: 'NF26020405ZBT0V0SF', orderDate: '2026-02-04T10:00:00Z', ordererEmail: 'xotrs1@gmail.com',              status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050057', fulfillmentStatus: 'Picked',            recipientName: '임*록',      tab: 'ORDER', detailStatus: 'shipment-picked' },
  { id: 'd011', channel: 'OWN',     orderNo: 'NF26011604JQE0YC5G', orderDate: '2026-01-16T10:00:00Z', ordererEmail: 'xotrs1@gmail.com',              status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-050058', fulfillmentStatus: 'Packed',            recipientName: '임*록',      tab: 'ORDER', detailStatus: 'shipment-packed' },
  { id: 'd012', channel: 'OWN',     orderNo: 'NF26031003B3F07D1J', orderDate: '2026-03-10T09:00:00Z', ordererEmail: 'fogbow.juni@gmail.com',         status: 'Completed',           fulfillmentNo: 'FUL-2026-050001', fulfillmentStatus: 'Delivered',         recipientName: '육*은',      tab: 'ORDER', detailStatus: 'shipment-delivered' },
  { id: 'd013', channel: 'OWN',     orderNo: 'NF26031903KOM0SCZX', orderDate: '2026-03-19T09:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Completed',           fulfillmentNo: 'FUL-2026-050002', fulfillmentStatus: 'Delivered',         recipientName: '오*은',      tab: 'ORDER', detailStatus: 'shipment-delivered' },
  { id: 'd014', channel: 'OWN',     orderNo: 'NF26031001UTJ0WCIH', orderDate: '2026-03-10T10:00:00Z', ordererEmail: 'fogbow.juni@gmail.com',         status: 'Completed',           fulfillmentNo: 'FUL-2026-050003', fulfillmentStatus: 'Delivered',         recipientName: '육*은',      tab: 'ORDER', detailStatus: 'shipment-delivered' },
  { id: 'd015', channel: 'OWN',     orderNo: 'NF26031903B3F07D1J', orderDate: '2026-03-19T09:30:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Completed',           fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '오*은',      tab: 'ORDER', detailStatus: 'order-completed' },
  { id: 'd016', channel: 'OWN',     orderNo: 'NF26010504WY00EOP8', orderDate: '2026-01-05T09:00:00Z', ordererEmail: 'gmpm1team@gmail.com',           status: 'Completed',           fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '이*후',      tab: 'ORDER', detailStatus: 'order-completed' },
  { id: 'd017', channel: 'OWN',     orderNo: 'NF26031903CTZ0VSYY', orderDate: '2026-03-19T09:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Canceled',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '오*은',      tab: 'ORDER', detailStatus: 'order-canceled' },
  { id: 'd018', channel: 'OWN',     orderNo: 'NF26031903CKV0YSB1', orderDate: '2026-03-19T09:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Canceled',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '오*은',      tab: 'ORDER', detailStatus: 'order-canceled' },
  { id: 'd019', channel: 'OWN',     orderNo: 'NF26010600IQ103WGA', orderDate: '2026-01-06T09:00:00Z', ordererEmail: 'gmldud8100@naver.com',          status: 'Shipped',             fulfillmentNo: 'FUL-2026-050059', fulfillmentStatus: 'Shipped',           recipientName: '강*영',      tab: 'ORDER', detailStatus: 'pickup-shipped' },
  { id: 'd020', channel: 'OWN',     orderNo: 'NF260310044KA0BEB8', orderDate: '2026-03-10T09:00:00Z', ordererEmail: 'fogbow.juni@gmail.com',         status: 'Completed',           fulfillmentNo: 'FUL-2026-050004', fulfillmentStatus: 'Completed',         recipientName: '오*은',      tab: 'ORDER', detailStatus: 'pickup-completed' },
  // CLAIM tab
  { id: 'c001', channel: 'OWN',     orderNo: 'NF26031001WPU0OQXM', orderDate: '2026-03-12T09:00:00Z', ordererEmail: 'fogbow.juni@gmail.com',         status: 'Pending',             fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '육*은',      tab: 'CLAIM', detailStatus: 'return-pending' },
  { id: 'c002', channel: 'OWN',     orderNo: 'NF26031001X0P03VC9', orderDate: '2026-03-11T14:00:00Z', ordererEmail: 'fogbow.juni@gmail.com',         status: 'Pickup Requested',    fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '육*은',      tab: 'CLAIM', detailStatus: 'return-pickup-requested' },
  { id: 'c003', channel: 'OWN',     orderNo: 'NF26012201A7S0EYZ6', orderDate: '2026-03-10T11:00:00Z', ordererEmail: 'show1515@naver.com',            status: 'Received',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '최*원',      tab: 'CLAIM', detailStatus: 'return-received' },
  { id: 'c004', channel: 'OWN',     orderNo: 'NF26022605I320T5TQ', orderDate: '2026-03-01T09:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Refunded',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '육*은',      tab: 'CLAIM', detailStatus: 'return-refunded' },
  { id: 'c005', channel: 'OWN',     orderNo: 'NF26022605B240AKW3', orderDate: '2026-03-02T16:00:00Z', ordererEmail: 'wnstnwl@naver.com',             status: 'Refunded',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '권*지',      tab: 'CLAIM', detailStatus: 'return-refunded' },
  { id: 'c006', channel: 'OWN',     orderNo: 'NF26022604QVO0HC89', orderDate: '2026-03-12T10:00:00Z', ordererEmail: 'monster1199@gentlemonster.com', status: 'Pending',             fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '옥*철',      tab: 'CLAIM', detailStatus: 'exchange-pending' },
  { id: 'c007', channel: 'OWN',     orderNo: 'NF26022604ZGW0HDUX', orderDate: '2026-03-09T13:00:00Z', ordererEmail: 'bighamster27@naver.com',        status: 'Received',            fulfillmentNo: '-',              fulfillmentStatus: '-',                recipientName: '육*은',      tab: 'CLAIM', detailStatus: 'exchange-received' },
  { id: 'c008', channel: 'OWN',     orderNo: 'NF26022604PVI0IHPJ', orderDate: '2026-03-11T15:30:00Z', ordererEmail: 'monster1199@gentlemonster.com', status: 'Shipment Requested',  fulfillmentNo: 'FUL-2026-060031', fulfillmentStatus: 'Picking Requested', recipientName: '옥*철',      tab: 'CLAIM', detailStatus: 'exchange-shipment-requested' },
  { id: 'c009', channel: 'OWN',     orderNo: 'NF26010504WY00EOP8', orderDate: '2026-03-03T11:00:00Z', ordererEmail: 'gmpm1team@gmail.com',           status: 'Exchanged',           fulfillmentNo: 'FUL-2026-060010', fulfillmentStatus: 'Delivered',         recipientName: '이*후',      tab: 'CLAIM', detailStatus: 'exchange-exchanged' },
  { id: 'c010', channel: 'OWN',     orderNo: 'NF260128014XJ0YD2V', orderDate: '2026-03-11T15:00:00Z', ordererEmail: 'wnstnwl@naver.com',             status: 'Picking Requested',   fulfillmentNo: 'FUL-2026-070021', fulfillmentStatus: 'Picking Requested', recipientName: '권*지',      tab: 'CLAIM', detailStatus: 'reshipment-picking-requested' },
  { id: 'c011', channel: 'OWN',     orderNo: 'NF260123053K30Q9FN', orderDate: '2026-03-04T10:00:00Z', ordererEmail: 'xotrs1@gmail.com',              status: 'Delivered',           fulfillmentNo: 'FUL-2026-070005', fulfillmentStatus: 'Delivered',         recipientName: '임*록',      tab: 'CLAIM', detailStatus: 'reshipment-delivered' },
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
  CartItem,
  WishlistItem,
  SalesInventoryItem,
  InboundItem,
  InboundTrackingItem,
  RestockAlertItem,
  DtcMtcSummary,
  BestsellerItem,
  OrderPatternData,
  MarketingChannelItem,
  CampaignItem,
  MarketingKPI,
  CollectionTrendSeries,
} from '@/features/sales-dashboard/models/types'

export type {
  SalesDashboardKPI,
  SalesChannelData,
  SalesTrendItem,
  CategorySales,
  CollectionSales,
  ProductPerformanceItem,
  CustomerAnalysisData,
  CartItem,
  WishlistItem,
  SalesInventoryItem,
  InboundItem,
  InboundTrackingItem,
  RestockAlertItem,
  DtcMtcSummary,
  BestsellerItem,
  OrderPatternData,
  MarketingChannelItem,
  CampaignItem,
  MarketingKPI,
  CollectionTrendSeries,
}

// OMS 실데이터: 807건 (DELETED 314 제외 493건), GIFT 134건(16.6%), 취소 194건
// 판매 로스: 재고 부족 취소 60건 → 기회 손실 추정 (평균 AOV 324K × 60건)
export const mockSalesKPI: SalesDashboardKPI = {
  totalRevenue: 1_245_800_000,
  totalRevenueDelta: 12.3,
  totalOrders: 493,
  totalOrdersDelta: 38.2,
  aov: 324_200,
  aovDelta: 3.2,
  conversionRate: 4.7,
  conversionRateDelta: -0.3,
  salesLoss: 19_452_000,    // 재고 부족 취소 60건 × AOV 324K
  salesLossDelta: 42.8,     // 전기간 대비 증가 (재고 부족 이슈 심화)
  restockAlertCount: 312,
  restockAlertDelta: 28.6,
}

// 자사몰(온라인) 전용 — 오프라인 채널 없음
export const mockSalesChannelData: SalesChannelData = {
  online: 1_245_800_000,  // 전체 = 온라인(자사몰)
  offline: 0,
  gift: 134_000_000,      // OMS 실데이터 기반 추정: 기프트 16.6% × 총매출 (건수 134건)
  giftOrderCount: 134,    // OMS 실데이터
  giftRatio: 16.6,        // OMS 실데이터
}

// 2026-01~03 주문 건수 실데이터 기반 조정: 1월 201건 → 2월 327건(+62.7%) → 3월 279건(23일까지)
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
  { label: '2026-01', revenue:   980_000_000, revenuePrevYear: 870_000_000 },  // 201건
  { label: '2026-02', revenue: 1_595_000_000, revenuePrevYear: 1_050_000_000 }, // 327건 (+62.7%)
  { label: '2026-03', revenue: 1_245_800_000, revenuePrevYear: 1_108_000_000 }, // 279건(23일)
]

// 일별 매출 추이 (2026-03-01 ~ 2026-03-23 더미)
export const mockSalesTrendDaily: SalesTrendItem[] = [
  { label: '03-01', revenue:  38_000_000, revenuePrevYear:  32_000_000 },
  { label: '03-02', revenue:  42_000_000, revenuePrevYear:  35_000_000 },
  { label: '03-03', revenue:  55_000_000, revenuePrevYear:  48_000_000 },
  { label: '03-04', revenue:  61_000_000, revenuePrevYear:  52_000_000 },
  { label: '03-05', revenue:  48_000_000, revenuePrevYear:  40_000_000 },
  { label: '03-06', revenue:  44_000_000, revenuePrevYear:  38_000_000 },
  { label: '03-07', revenue:  39_000_000, revenuePrevYear:  33_000_000 },
  { label: '03-08', revenue:  52_000_000, revenuePrevYear:  45_000_000 },
  { label: '03-09', revenue:  58_000_000, revenuePrevYear:  50_000_000 },
  { label: '03-10', revenue:  72_000_000, revenuePrevYear:  60_000_000 },
  { label: '03-11', revenue:  68_000_000, revenuePrevYear:  57_000_000 },
  { label: '03-12', revenue:  45_000_000, revenuePrevYear:  38_000_000 },
  { label: '03-13', revenue:  41_000_000, revenuePrevYear:  35_000_000 },
  { label: '03-14', revenue:  50_000_000, revenuePrevYear:  43_000_000 },
  { label: '03-15', revenue:  63_000_000, revenuePrevYear:  54_000_000 },
  { label: '03-16', revenue:  70_000_000, revenuePrevYear:  62_000_000 },
  { label: '03-17', revenue:  65_000_000, revenuePrevYear:  56_000_000 },
  { label: '03-18', revenue:  48_000_000, revenuePrevYear:  41_000_000 },
  { label: '03-19', revenue:  43_000_000, revenuePrevYear:  36_000_000 },
  { label: '03-20', revenue:  56_000_000, revenuePrevYear:  48_000_000 },
  { label: '03-21', revenue:  74_000_000, revenuePrevYear:  63_000_000 },
  { label: '03-22', revenue:  80_000_000, revenuePrevYear:  68_000_000 },
  { label: '03-23', revenue:  71_000_000, revenuePrevYear:  59_000_000 },
]

// 일별 컬렉션 판매 추이 (2026-03-01 ~ 2026-03-23 더미)
export const mockCollectionTrendDaily: CollectionTrendSeries[] = [
  {
    collection: 'Wave', color: '#1976d2',
    data: [
      { label: '03-01', revenue: 6_500_000 }, { label: '03-03', revenue: 9_200_000 },
      { label: '03-05', revenue: 7_800_000 }, { label: '03-08', revenue: 8_400_000 },
      { label: '03-10', revenue: 12_000_000 }, { label: '03-12', revenue: 7_200_000 },
      { label: '03-15', revenue: 10_500_000 }, { label: '03-17', revenue: 9_800_000 },
      { label: '03-19', revenue: 7_100_000 }, { label: '03-22', revenue: 13_200_000 },
    ],
  },
  {
    collection: 'Line', color: '#7c3aed',
    data: [
      { label: '03-01', revenue: 14_000_000 }, { label: '03-03', revenue: 18_000_000 },
      { label: '03-05', revenue: 15_500_000 }, { label: '03-08', revenue: 17_200_000 },
      { label: '03-10', revenue: 22_000_000 }, { label: '03-12', revenue: 14_800_000 },
      { label: '03-15', revenue: 20_000_000 }, { label: '03-17', revenue: 19_500_000 },
      { label: '03-19', revenue: 14_200_000 }, { label: '03-22', revenue: 24_000_000 },
    ],
  },
  {
    collection: 'Straight', color: '#16a34a',
    data: [
      { label: '03-01', revenue: 4_200_000 }, { label: '03-03', revenue: 5_800_000 },
      { label: '03-05', revenue: 4_900_000 }, { label: '03-08', revenue: 5_400_000 },
      { label: '03-10', revenue: 7_200_000 }, { label: '03-12', revenue: 4_600_000 },
      { label: '03-15', revenue: 6_500_000 }, { label: '03-17', revenue: 6_100_000 },
      { label: '03-19', revenue: 4_400_000 }, { label: '03-22', revenue: 8_100_000 },
    ],
  },
  {
    collection: 'Pattern', color: '#ea580c',
    data: [
      { label: '03-01', revenue: 7_100_000 }, { label: '03-03', revenue: 9_400_000 },
      { label: '03-05', revenue: 8_000_000 }, { label: '03-08', revenue: 8_800_000 },
      { label: '03-10', revenue: 11_500_000 }, { label: '03-12', revenue: 7_600_000 },
      { label: '03-15', revenue: 10_200_000 }, { label: '03-17', revenue: 9_600_000 },
      { label: '03-19', revenue: 7_300_000 }, { label: '03-22', revenue: 12_800_000 },
    ],
  },
  {
    collection: 'Fashion', color: '#9e9e9e',
    data: [
      { label: '03-01', revenue: 2_600_000 }, { label: '03-03', revenue: 3_400_000 },
      { label: '03-05', revenue: 2_900_000 }, { label: '03-08', revenue: 3_200_000 },
      { label: '03-10', revenue: 4_100_000 }, { label: '03-12', revenue: 2_700_000 },
      { label: '03-15', revenue: 3_700_000 }, { label: '03-17', revenue: 3_500_000 },
      { label: '03-19', revenue: 2_500_000 }, { label: '03-22', revenue: 4_600_000 },
    ],
  },
]

// OMS 실데이터 기반: CUTLERY 451건(68%), TABLE ACCESSORIES 206건(31%), DRINKING WEAR 4건, PLATE&BOWL 2건
export const mockCategorySales: CategorySales[] = [
  { category: '커틀러리',   revenue: 847_000_000, quantity: 451 },
  { category: '다이닝웨어', revenue: 390_400_000, quantity: 208 },
  { category: '드링크웨어', revenue:   8_400_000, quantity:   4 },
]

// PIM 실데이터 기반 컬렉션 순위: LINE 94개 > PATTERN 53개 > WAVE 39개 > FASHION 30개 > MINI/STRAIGHT 20개 > OFFICE 16개 > NAIL 15개
// OMS 베스트셀러 반영: Wave 계열 4개 제품이 Top10, Chess(Straight계열) 1위
export const mockCollectionSales: CollectionSales[] = [
  { rank: 1, collection: 'Line',     revenue: 428_000_000, quantity: 2880, deltaRate:  22.4 },
  { rank: 2, collection: 'Wave',     revenue: 312_000_000, quantity: 1620, deltaRate:  15.7 },
  { rank: 3, collection: 'Pattern',  revenue: 218_000_000, quantity: 1480, deltaRate:  -3.2 },
  { rank: 4, collection: 'Straight', revenue: 148_000_000, quantity: 980,  deltaRate:  38.6 },
  { rank: 5, collection: 'Fashion',  revenue:  82_000_000, quantity: 740,  deltaRate:  -8.1 },
  { rank: 6, collection: 'Mini',     revenue:  38_400_000, quantity: 920,  deltaRate: -12.4 },
  { rank: 7, collection: 'Office',   revenue:  14_600_000, quantity: 280,  deltaRate: -18.2 },
  { rank: 8, collection: 'Nail',     revenue:  10_800_000, quantity: 196,  deltaRate: -24.5 },
]

// 출처: MD 리포트 기반 — 순위: 전체 매출 기준 내림차순
// demandSignal = 판매로스 + 입고알림 합산 (재고 없어서 못 판 수요 + 알림 신청 수)
// offlineSales = 오프라인 판매량 (slow_moving 채널 갭 확인용)
// sellOutDate = 소진예상 절대 날짜 (slow_moving)
export const mockProductPerformance: ProductPerformanceItem[] = [
  { rank:  1, productName: '네일 텀블러',         category: '드링크웨어', quantity: 312, revenue: 52_416_000, salesVelocity: 10.4, conversionRate: 6.8, currentStock:   18, sellThroughRate: 94.5, daysToSellOut:    2, classification: 'reorder',     demandSignal: 728 },
  { rank:  2, productName: '네일 카푸치노 컵',    category: '드링크웨어', quantity: 198, revenue: 25_740_000, salesVelocity:  6.6, conversionRate: 5.2, currentStock:   31, sellThroughRate: 86.5, daysToSellOut:    5, classification: 'reorder',     demandSignal: 313 },
  { rank:  3, productName: '펜슬 커틀러리 세트', category: '커틀러리',   quantity: 248, revenue: 17_360_000, salesVelocity:  8.3, conversionRate: 5.5, currentStock:   64, sellThroughRate: 79.5, daysToSellOut:    8, classification: 'reorder',     demandSignal: 155 },
  { rank:  4, productName: '라인 머그 L',         category: '드링크웨어', quantity: 210, revenue: 14_700_000, salesVelocity:  7.0, conversionRate: 4.1, currentStock:   82, sellThroughRate: 71.9, daysToSellOut:   12, classification: 'reorder',     demandSignal: 124 },
  { rank:  5, productName: '크래커 포크',         category: '커틀러리',   quantity: 580, revenue: 13_920_000, salesVelocity: 19.3, conversionRate: 5.9, currentStock:   24, sellThroughRate: 96.0, daysToSellOut:    1, classification: 'reorder',     demandSignal: 412 },
  { rank:  6, productName: '라인 카푸치노 컵',    category: '드링크웨어', quantity: 188, revenue: 13_160_000, salesVelocity:  6.3, conversionRate: 3.5, currentStock:  145, sellThroughRate: 56.5, daysToSellOut:   23, classification: 'normal' },
  { rank:  7, productName: '크래커 스푼',         category: '커틀러리',   quantity: 420, revenue:  8_400_000, salesVelocity: 14.0, conversionRate: 4.8, currentStock:   42, sellThroughRate: 90.9, daysToSellOut:    3, classification: 'reorder',     demandSignal: 287 },
  { rank:  8, productName: '웨이브 포크',         category: '커틀러리',   quantity: 297, revenue:  7_128_000, salesVelocity:  9.9, conversionRate: 4.2, currentStock:   58, sellThroughRate: 83.7, daysToSellOut:    6, classification: 'reorder',     demandSignal: 198 },
  { rank:  9, productName: '캔들 포크',           category: '커틀러리',   quantity: 215, revenue:  5_375_000, salesVelocity:  7.2, conversionRate: 3.8, currentStock:   95, sellThroughRate: 69.4, daysToSellOut:   13, classification: 'reorder',     demandSignal:  98 },
  { rank: 10, productName: '웨이브 디저트 포크', category: '커틀러리',   quantity: 247, revenue:  5_188_000, salesVelocity:  8.2, conversionRate: 3.2, currentStock:  118, sellThroughRate: 67.7, daysToSellOut:   14, classification: 'normal' },
  { rank: 11, productName: '네일 포크',           category: '커틀러리',   quantity: 165, revenue:  4_125_000, salesVelocity:  5.5, conversionRate: 2.9, currentStock:  160, sellThroughRate: 50.8, daysToSellOut:   29, classification: 'normal' },
  { rank: 12, productName: '링 디저트 포크',      category: '커틀러리',   quantity: 114, revenue:  2_394_000, salesVelocity:  3.8, conversionRate: 2.4, currentStock:  188, sellThroughRate: 37.7, daysToSellOut:   49, classification: 'normal' },
  { rank: 13, productName: '웨이브 버터 나이프',  category: '커틀러리',   quantity:  98, revenue:  2_058_000, salesVelocity:  3.3, conversionRate: 2.1, currentStock:  210, sellThroughRate: 31.8, daysToSellOut:   64, classification: 'normal' },
  { rank: 14, productName: '닷 포크',             category: '커틀러리',   quantity:  82, revenue:  1_968_000, salesVelocity:  2.7, conversionRate: 1.8, currentStock:  195, sellThroughRate: 29.6, daysToSellOut:   72, classification: 'normal' },
  { rank: 15, productName: '샤이닝 디너',         category: '다이닝웨어', quantity:  18, revenue:  1_530_000, salesVelocity:  0.6, conversionRate: 0.5, currentStock:  802, sellThroughRate:  2.2, daysToSellOut:  310, sellOutDate: '2027-01-28', classification: 'slow_moving', offlineSales:  82 },
  { rank: 16, productName: '샤이닝 디저트 스푼',  category: '커틀러리',   quantity:  12, revenue:    516_000, salesVelocity:  0.4, conversionRate: 0.4, currentStock:  847, sellThroughRate:  1.4, daysToSellOut:  348, sellOutDate: '2027-03-07', classification: 'slow_moving', offlineSales:  74 },
  { rank: 17, productName: '체스 디저트 포크',    category: '커틀러리',   quantity:   8, revenue:    344_000, salesVelocity:  0.3, conversionRate: 0.3, currentStock:  885, sellThroughRate:  0.9, daysToSellOut:  690, sellOutDate: '2028-02-12', classification: 'slow_moving', offlineSales: 112 },
  { rank: 18, productName: '닷 디저트 포크',      category: '커틀러리',   quantity:  16, revenue:    336_000, salesVelocity:  0.5, conversionRate: 0.4, currentStock: 2753, sellThroughRate:  0.6, daysToSellOut:  740, sellOutDate: '2028-04-02', classification: 'slow_moving', offlineSales: 193 },
  { rank: 19, productName: '닷 디저트 스푼',      category: '커틀러리',   quantity:  10, revenue:    210_000, salesVelocity:  0.3, conversionRate: 0.3, currentStock: 2820, sellThroughRate:  0.4, daysToSellOut: 1196, sellOutDate: '2029-07-02', classification: 'slow_moving', offlineSales: 132 },
  { rank: 20, productName: '와퍼스 스푼',         category: '커틀러리',   quantity:   4, revenue:    132_000, salesVelocity:  0.1, conversionRate: 0.2, currentStock: 1151, sellThroughRate:  0.3, daysToSellOut: 3285, sellOutDate: '2035-05-02', classification: 'slow_moving', offlineSales:  28 },
]

// 출처: PIM + OMS CSV 기반 — 실제 판매 속도 높은 상품 기준
export const mockSalesInventory: SalesInventoryItem[] = [
  { productName: '체스 디저트 포크',   category: '커틀러리',        currentStock: 45,  sellThroughRate: 94.7, daysToSellOut: 2,  salesVelocity: 27.0 },
  { productName: '웨이브 트레이',       category: '다이닝웨어', currentStock: 38,  sellThroughRate: 94.7, daysToSellOut: 2,  salesVelocity: 22.7 },
  { productName: '웨이브 홀더',         category: '다이닝웨어', currentStock: 52,  sellThroughRate: 91.2, daysToSellOut: 3,  salesVelocity: 18.1 },
  { productName: '웨이브 스푼',         category: '커틀러리',        currentStock: 95,  sellThroughRate: 83.9, daysToSellOut: 6,  salesVelocity: 16.6 },
  { productName: '필로우 스푼',         category: '커틀러리',        currentStock: 88,  sellThroughRate: 81.6, daysToSellOut: 7,  salesVelocity: 13.0 },
]

export const mockInboundItems: InboundItem[] = [
  { productName: '체스 디저트 포크',   category: '커틀러리',        inboundQty: 400, expectedDate: '2026-03-25', inboundType: 'restock' },
  { productName: '웨이브 트레이',       category: '다이닝웨어', inboundQty: 200, expectedDate: '2026-03-27', inboundType: 'restock' },
  { productName: '닷 듀오 세트 블랙',  category: '커틀러리',        inboundQty: 250, expectedDate: '2026-04-02', inboundType: 'new' },
  { productName: '웨이브 홀더',         category: '다이닝웨어', inboundQty: 180, expectedDate: '2026-04-05', inboundType: 'restock' },
  { productName: '벌룬 스푼 세트',     category: '커틀러리',        inboundQty: 120, expectedDate: '2026-04-10', inboundType: 'new' },
]

// 재입고 알림신청 상품별 목록 (더미 · 알림 시스템 연동 필요)
export const mockRestockAlerts: RestockAlertItem[] = [
  { productName: '체스 디저트 포크', category: '커틀러리',        alertCount: 148, currentStock: 45, daysToSellOut: 2 },
  { productName: '웨이브 트레이',     category: '다이닝웨어', alertCount:  82, currentStock: 38, daysToSellOut: 2 },
  { productName: '웨이브 홀더',       category: '다이닝웨어', alertCount:  54, currentStock: 52, daysToSellOut: 3 },
  { productName: '웨이브 스푼',       category: '커틀러리',        alertCount:  18, currentStock: 95, daysToSellOut: 6 },
  { productName: '필로우 스푼',       category: '커틀러리',        alertCount:  10, currentStock: 88, daysToSellOut: 7 },
]

// 자사몰(DTC) 전용 — MTC(멀티채널) 없음
export const mockDtcMtcSummary: DtcMtcSummary = {
  dtcRevenue: 1_245_800_000,
  dtcRatio: 100,
  mtcRevenue: 0,
  mtcRatio: 0,
  dtcOrderCount: 493,     // OMS 실데이터: DELETED 제외 3개월
  mtcOrderCount: 0,
}

const mockCartItems: CartItem[] = [
  { productName: '네일 텀블러',          category: '텀블러',      cartCount: 1842, purchaseRate: 38.2 },
  { productName: '네일 카푸치노 컵',      category: '머그/컵',     cartCount: 1204, purchaseRate: 22.7 },
  { productName: '체스 디저트 포크',      category: '커틀러리',    cartCount:  986, purchaseRate: 61.4 },
  { productName: '펜슬 커틀러리 세트',    category: '커틀러리',    cartCount:  874, purchaseRate: 44.8 },
  { productName: '웨이브 트레이',         category: '다이닝웨어',  cartCount:  712, purchaseRate: 40.6 },
  { productName: '크래커 포크',           category: '커틀러리',    cartCount:  634, purchaseRate: 51.3 },
  { productName: '라인 머그 L',           category: '머그/컵',     cartCount:  520, purchaseRate: 28.1 },
  { productName: '샤이닝 디너',           category: '다이닝웨어',  cartCount:  318, purchaseRate: 12.3 },
  { productName: '닷 디저트 포크',        category: '커틀러리',    cartCount:  248, purchaseRate:  9.7 },
  { productName: '와퍼스 스푼',           category: '커틀러리',    cartCount:  182, purchaseRate:  6.0 },
]

const mockWishlistItems: WishlistItem[] = [
  { productName: '네일 텀블러',          category: '텀블러',      wishlistCount: 1124, currentStock:  12, daysToSellOut:  2 },
  { productName: '네일 카푸치노 컵',      category: '머그/컵',     wishlistCount:  842, currentStock:  28, daysToSellOut:  4 },
  { productName: '크래커 스푼',           category: '커틀러리',    wishlistCount:  634, currentStock:  45, daysToSellOut:  6 },
  { productName: '웨이브 포크',           category: '커틀러리',    wishlistCount:  512, currentStock:  62, daysToSellOut:  9 },
  { productName: '펜슬 커틀러리 세트',    category: '커틀러리',    wishlistCount:  384, currentStock:  88, daysToSellOut: 14 },
  { productName: '라인 머그 L',           category: '머그/컵',     wishlistCount:  298, currentStock: 110, daysToSellOut: 21 },
  { productName: '체스 디저트 포크',      category: '커틀러리',    wishlistCount:  214, currentStock: 520, daysToSellOut: null },
  { productName: '닷 디저트 스푼',        category: '커틀러리',    wishlistCount:  168, currentStock: 488, daysToSellOut: null },
]

export const mockCustomerAnalysis: CustomerAnalysisData = {
  newCustomers: 1204,
  repeatCustomers: 747,
  newRatio: 61.6,
  repeatRatio: 38.4,
  totalCustomers: 1951,
  cartAddCount: 8420,
  wishlistAddCount: 5130,
  cartItems: mockCartItems,
  wishlistItems: mockWishlistItems,
}

// ----- 주문 인사이트 (5.6) — 실데이터 기반 -----
// 출처: IIC_OMS Order List CSV (NUF_Official_KR 채널)

// 출처: IIC_OMS Order List CSV — 실제 상품명 기반, 주문 건수는 3개월 누계 스케일
export const mockBestsellers: BestsellerItem[] = [
  { rank: 1,  productName: '체스 디저트 포크', orderCount: 122, revenue: 2_684_000, cancelCount: 42, cancelRate: 34.4 },
  { rank: 2,  productName: '웨이브 트레이',     orderCount:  58, revenue: 2_030_000, cancelCount: 15, cancelRate: 25.8 },
  { rank: 3,  productName: '웨이브 스푼',       orderCount:  52, revenue: 1_248_000, cancelCount:  6, cancelRate: 11.5 },
  { rank: 4,  productName: '웨이브 홀더',       orderCount:  48, revenue: 2_496_000, cancelCount:  4, cancelRate:  8.3 },
  { rank: 5,  productName: '체스 나이프',       orderCount:  44, revenue:   594_000, cancelCount:  3, cancelRate:  6.8 },
  { rank: 6,  productName: '필로우 스푼',       orderCount:  38, revenue: 1_254_000, cancelCount:  6, cancelRate: 15.8 },
  { rank: 7,  productName: '웨이브 코스터',     orderCount:  32, revenue:   330_000, cancelCount:  8, cancelRate: 25.0 },
  { rank: 8,  productName: '닷 스푼 세트',      orderCount:  26, revenue:   546_000, cancelCount:  2, cancelRate:  7.7 },
  { rank: 9,  productName: '웨이브 디저트 포크', orderCount: 22, revenue:   462_000, cancelCount:  5, cancelRate: 22.7 },
  { rank: 10, productName: '닷 나이프',         orderCount:  18, revenue:   378_000, cancelCount:  1, cancelRate:  5.6 },
]

export const mockOrderPattern: OrderPatternData = {
  giftCount: 134,       // OMS 실데이터
  normalCount: 673,     // OMS 실데이터
  giftRatio: 16.6,
  cancelCount: 194,
  cancelRate: 24.0,
  // 출처: IIC_OMS CSV 취소 원인 실집계 기반 (194건)
  cancelReasons: [
    { reason: '재고 부족',      count: 60, ratio: 30.9 },
    { reason: '단순 변심 / 기타', count: 52, ratio: 26.8 },
    { reason: '판매자 귀책',    count: 36, ratio: 18.6 },
    { reason: '배송 지연',      count: 20, ratio: 10.3 },
    { reason: '상품 불량',      count: 14, ratio:  7.2 },
    { reason: '사이즈/디자인 불만', count: 12, ratio:  6.2 },
  ],
}

// ----- 컬렉션 판매 추이 — 더미 데이터 -----
// 상위 5개 컬렉션 × 최근 6개월 월별 매출 추이

export const mockCollectionTrend: CollectionTrendSeries[] = [
  {
    collection: 'Wave', color: '#1976d2',
    data: [
      { label: '2025-10', revenue: 180_000_000 },
      { label: '2025-11', revenue: 210_000_000 },
      { label: '2025-12', revenue: 265_000_000 },
      { label: '2026-01', revenue: 220_000_000 },
      { label: '2026-02', revenue: 312_000_000 },
      { label: '2026-03', revenue: 195_000_000 },
    ],
  },
  {
    collection: 'Line', color: '#7c3aed',
    data: [
      { label: '2025-10', revenue: 310_000_000 },
      { label: '2025-11', revenue: 360_000_000 },
      { label: '2025-12', revenue: 420_000_000 },
      { label: '2026-01', revenue: 280_000_000 },
      { label: '2026-02', revenue: 390_000_000 },
      { label: '2026-03', revenue: 428_000_000 },
    ],
  },
  {
    collection: 'Straight', color: '#16a34a',
    data: [
      { label: '2025-10', revenue:  68_000_000 },
      { label: '2025-11', revenue:  82_000_000 },
      { label: '2025-12', revenue: 105_000_000 },
      { label: '2026-01', revenue:  92_000_000 },
      { label: '2026-02', revenue: 128_000_000 },
      { label: '2026-03', revenue: 148_000_000 },
    ],
  },
  {
    collection: 'Pattern', color: '#ea580c',
    data: [
      { label: '2025-10', revenue: 155_000_000 },
      { label: '2025-11', revenue: 178_000_000 },
      { label: '2025-12', revenue: 210_000_000 },
      { label: '2026-01', revenue: 168_000_000 },
      { label: '2026-02', revenue: 195_000_000 },
      { label: '2026-03', revenue: 218_000_000 },
    ],
  },
  {
    collection: 'Fashion', color: '#9e9e9e',
    data: [
      { label: '2025-10', revenue:  92_000_000 },
      { label: '2025-11', revenue: 105_000_000 },
      { label: '2025-12', revenue: 118_000_000 },
      { label: '2026-01', revenue:  75_000_000 },
      { label: '2026-02', revenue:  80_000_000 },
      { label: '2026-03', revenue:  82_000_000 },
    ],
  },
]

// ----- 입고 추적 현황 — 더미 데이터 -----
// plannedDate 기준 최근 입고 예정 + 실적 추적

export const mockInboundTracking: InboundTrackingItem[] = [
  { productName: '네일 포크',              category: '커틀러리',        plannedQty: 300, plannedDate: '2026-03-20', receivedQty: 300, status: 'received',  inboundType: 'restock' },
  { productName: '웨이브 레스트 2P 세트',  category: '다이닝웨어', plannedQty: 150, plannedDate: '2026-03-22', receivedQty:  90, status: 'partial',   inboundType: 'restock' },
  { productName: '닷 듀오 세트 블랙',      category: '커틀러리',        plannedQty: 120, plannedDate: '2026-03-18', receivedQty:   0, status: 'overdue',   inboundType: 'new'     },
  { productName: 'SS25 네일 에스프레소',   category: '드링크웨어',      plannedQty: 200, plannedDate: '2026-04-02', receivedQty:   0, status: 'pending',   inboundType: 'new'     },
  { productName: '네일 카푸치노',          category: '드링크웨어',      plannedQty: 180, plannedDate: '2026-04-05', receivedQty:   0, status: 'pending',   inboundType: 'restock' },
]

// ----- 마케팅 채널 성과 (5.7) — 더미 데이터 -----
// 출처: Google Analytics + 광고 시스템 연동 예정 (현재 더미)

export const mockMarketingKPI: MarketingKPI = {
  totalRoas: 7.4,
  adRevenue: 503_000_000,
  adSpend: 67_900_000,
  adOrders: 1542,
  adRevenueDelta: 18.2,
  roasDelta: 1.3,
}

export const mockMarketingChannels: MarketingChannelItem[] = [
  { channel: 'Organic Search', sessions: 42000, orders: 1240, revenue: 380_000_000, conversionRate: 2.95 },
  { channel: 'Paid Search',    sessions: 28000, orders:  980, revenue: 295_000_000, conversionRate: 3.50, roas: 8.2 },
  { channel: 'SNS',            sessions: 35000, orders:  720, revenue: 210_000_000, conversionRate: 2.06, roas: 6.4 },
  { channel: 'Email',          sessions: 12000, orders:  560, revenue: 168_000_000, conversionRate: 4.67 },
  { channel: 'Direct',         sessions: 18000, orders:  342, revenue:  192_800_000, conversionRate: 1.90 },
]

export const mockCampaigns: CampaignItem[] = [
  { name: 'Spring Wave Collection', channel: 'SNS',         period: '2026-02', spend:  8_200_000, revenue:  62_400_000, roas: 7.6, orders: 210 },
  { name: 'Nail Line Brand Day',    channel: 'Paid Search', period: '2026-03', spend:  5_400_000, revenue:  48_060_000, roas: 8.9, orders: 162 },
  { name: '설 선물 기획전',          channel: 'Email',       period: '2026-01', spend:  2_100_000, revenue:  18_900_000, roas: 9.0, orders:  98 },
  { name: 'Chess 신제품 론칭',       channel: 'SNS',         period: '2026-01', spend: 12_000_000, revenue:  45_600_000, roas: 3.8, orders: 389 },
  { name: 'Office 라인 프로모션',    channel: 'Paid Search', period: '2026-02', spend:  6_800_000, revenue:  14_280_000, roas: 2.1, orders:  54 },
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

// ----- OMS Integrated Order List -----

export type OrderListStatus =
  | 'Pending'
  | 'Collected'
  | 'Partly Confirmed'
  | 'Partial Shipment Requested'
  | 'Shipment Requested'
  | 'Completed'
  | 'Canceled'
  | 'Deleted'

export type OrderShippingStatus =
  | 'Picking Requested'
  | 'Picking Rejected'
  | 'Picked'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Canceled'

export type OrderChannel = 'OWN_KR' | 'OWN_INT'

export interface OrderListItem {
  orderId: string
  channel: OrderChannel
  orderDate: string          // "YYYY.MM.DD HH:mm:ss"
  ordererName: string | null // null = 비회원
  ordererEmail: string
  ordererPhone: string | null // null = 비회원
  status: OrderListStatus
  recipientName: string
  recipientPhone: string
  shippingStatuses: OrderShippingStatus[]
  shippingNos: string[]
  isMember: boolean
}

export const mockOrderListItems: OrderListItem[] = [
  {
    orderId: 'NF26032303WDR13HIC',
    channel: 'OWN_KR',
    orderDate: '2026.03.23 09:00:00',
    ordererName: '오*은',
    ordererEmail: 'bigh*****@naver.com',
    ordererPhone: '010-****-1234',
    status: 'Pending',
    recipientName: '오*은',
    recipientPhone: '010-****-1234',
    shippingStatuses: [],
    shippingNos: [],
    isMember: true,
  },
  {
    orderId: 'NF26031001X0P03VC9',
    channel: 'OWN_KR',
    orderDate: '2026.03.10 10:05:43',
    ordererName: '육*은',
    ordererEmail: 'fogb*****@gmail.com',
    ordererPhone: '010-****-5678',
    status: 'Collected',
    recipientName: '육*은',
    recipientPhone: '010-****-5678',
    shippingStatuses: [],
    shippingNos: [],
    isMember: true,
  },
  {
    orderId: 'NF26011204F720G3WE',
    channel: 'OWN_KR',
    orderDate: '2026.01.12 14:20:55',
    ordererName: '최*원',
    ordererEmail: 'show*****@naver.com',
    ordererPhone: '010-****-9012',
    status: 'Partly Confirmed',
    recipientName: '최*원',
    recipientPhone: '010-****-9012',
    shippingStatuses: [],
    shippingNos: [],
    isMember: true,
  },
  {
    orderId: 'NF26030604XKX0YWQ1',
    channel: 'OWN_KR',
    orderDate: '2026.03.06 10:00:00',
    ordererName: '오*은',
    ordererEmail: 'bigh*****@naver.com',
    ordererPhone: '010-****-3456',
    status: 'Partial Shipment Requested',
    recipientName: '오*은',
    recipientPhone: '010-****-3456',
    shippingStatuses: ['Picking Requested', 'Picked'],
    shippingNos: ['1234567890', '1234567891'],
    isMember: true,
  },
  {
    orderId: 'NF26030406KYL0540J',
    channel: 'OWN_KR',
    orderDate: '2026.03.04 09:00:00',
    ordererName: '윤*주',
    ordererEmail: 'mons*****@gentlemonster.com',
    ordererPhone: '010-****-7890',
    status: 'Shipment Requested',
    recipientName: '윤*주',
    recipientPhone: '010-****-7890',
    shippingStatuses: ['Picking Requested'],
    shippingNos: ['9876543210'],
    isMember: true,
  },
  {
    orderId: 'NF26021101VPH0SFLC',
    channel: 'OWN_KR',
    orderDate: '2026.02.11 10:00:00',
    ordererName: '임*록',
    ordererEmail: 'xotr*****@gmail.com',
    ordererPhone: '010-****-2345',
    status: 'Shipment Requested',
    recipientName: '임*록',
    recipientPhone: '010-****-2345',
    shippingStatuses: ['Picked'],
    shippingNos: ['1122334455'],
    isMember: true,
  },
  {
    orderId: 'NF26020405ZBT0V0SF',
    channel: 'OWN_KR',
    orderDate: '2026.02.04 10:00:00',
    ordererName: '임*록',
    ordererEmail: 'xotr*****@gmail.com',
    ordererPhone: '010-****-3456',
    status: 'Shipment Requested',
    recipientName: '임*록',
    recipientPhone: '010-****-3456',
    shippingStatuses: ['Packed'],
    shippingNos: ['5566778899'],
    isMember: true,
  },
  {
    orderId: 'NF26011604JQE0YC5G',
    channel: 'OWN_KR',
    orderDate: '2026.01.16 10:00:00',
    ordererName: '임*록',
    ordererEmail: 'xotr*****@gmail.com',
    ordererPhone: '010-****-4567',
    status: 'Shipment Requested',
    recipientName: '임*록',
    recipientPhone: '010-****-4567',
    shippingStatuses: ['Shipped'],
    shippingNos: ['6677889900'],
    isMember: true,
  },
  {
    orderId: 'NF260303044MQ0HI5J',
    channel: 'OWN_KR',
    orderDate: '2026.03.03 09:00:00',
    ordererName: '오*은',
    ordererEmail: 'bigh*****@naver.com',
    ordererPhone: '010-****-8901',
    status: 'Shipment Requested',
    recipientName: '오*은',
    recipientPhone: '010-****-8901',
    shippingStatuses: ['Picking Requested', 'Packed'],
    shippingNos: ['7788990011 외 1', '7788990012'],
    isMember: true,
  },
  {
    orderId: 'NF26031903KOM0SCZX',
    channel: 'OWN_KR',
    orderDate: '2026.03.19 09:00:00',
    ordererName: '오*은',
    ordererEmail: 'bigh*****@naver.com',
    ordererPhone: '010-****-0123',
    status: 'Completed',
    recipientName: '오*은',
    recipientPhone: '010-****-0123',
    shippingStatuses: ['Delivered'],
    shippingNos: ['8899001122'],
    isMember: true,
  },
  {
    orderId: 'NF26031001UTJ0WCIH',
    channel: 'OWN_KR',
    orderDate: '2026.03.10 10:00:00',
    ordererName: '육*은',
    ordererEmail: 'fogb*****@gmail.com',
    ordererPhone: '010-****-5678',
    status: 'Completed',
    recipientName: '육*은',
    recipientPhone: '010-****-5678',
    shippingStatuses: ['Delivered'],
    shippingNos: ['9900112233'],
    isMember: true,
  },
  {
    orderId: 'NF26010504WY00EOP8',
    channel: 'OWN_KR',
    orderDate: '2026.01.05 09:00:00',
    ordererName: '이*후',
    ordererEmail: 'gmpm*****@gmail.com',
    ordererPhone: '010-****-3456',
    status: 'Completed',
    recipientName: '이*후',
    recipientPhone: '010-****-3456',
    shippingStatuses: ['Delivered'],
    shippingNos: ['1011121314'],
    isMember: true,
  },
  {
    orderId: 'NF26031903CTZ0VSYY',
    channel: 'OWN_KR',
    orderDate: '2026.03.19 09:00:00',
    ordererName: '오*은',
    ordererEmail: 'bigh*****@naver.com',
    ordererPhone: '010-****-7890',
    status: 'Canceled',
    recipientName: '오*은',
    recipientPhone: '010-****-7890',
    shippingStatuses: [],
    shippingNos: [],
    isMember: true,
  },
  {
    orderId: 'NF26030305TW00L9CA',
    channel: 'OWN_KR',
    orderDate: '2026.03.03 09:00:00',
    ordererName: '옥*철',
    ordererEmail: 'mons*****@gentlemonster.com',
    ordererPhone: '010-****-2345',
    status: 'Canceled',
    recipientName: '옥*철',
    recipientPhone: '010-****-2345',
    shippingStatuses: [],
    shippingNos: [],
    isMember: true,
  },
  {
    orderId: 'NF26030305JAZ0D7ZD',
    channel: 'OWN_KR',
    orderDate: '2026.03.03 09:00:00',
    ordererName: '옥*철',
    ordererEmail: 'mons*****@gentlemonster.com',
    ordererPhone: '010-****-6789',
    status: 'Deleted',
    recipientName: '옥*철',
    recipientPhone: '010-****-6789',
    shippingStatuses: [],
    shippingNos: [],
    isMember: true,
  },
  {
    orderId: 'NF2603190ID9810ZXR',
    channel: 'OWN_KR',
    orderDate: '2026.03.20 09:00:00',
    ordererName: '오*은',
    ordererEmail: 'bigh*****@naver.com',
    ordererPhone: '010-****-0123',
    status: 'Pending',
    recipientName: '오*은',
    recipientPhone: '010-****-0123',
    shippingStatuses: [],
    shippingNos: [],
    isMember: true,
  },
  {
    orderId: 'NF260128014XJ0YD2V',
    channel: 'OWN_KR',
    orderDate: '2026.01.28 10:00:00',
    ordererName: '권*지',
    ordererEmail: 'wnst*****@naver.com',
    ordererPhone: '010-****-4567',
    status: 'Shipment Requested',
    recipientName: '권*지',
    recipientPhone: '010-****-4567',
    shippingStatuses: ['Picking Rejected'],
    shippingNos: ['3132333435'],
    isMember: true,
  },
  {
    orderId: 'NF26031001WPU0OQXM',
    channel: 'OWN_KR',
    orderDate: '2026.03.10 10:00:00',
    ordererName: '육*은',
    ordererEmail: 'fogb*****@gmail.com',
    ordererPhone: '010-****-8901',
    status: 'Completed',
    recipientName: '육*은',
    recipientPhone: '010-****-8901',
    shippingStatuses: ['Delivered'],
    shippingNos: ['4142434445'],
    isMember: true,
  },
]

// ----- Sales Dashboard: 트래픽 & 전환 분석 (GA4 Data API) -----
// 출처: 이커머스_(NF) 온라인 트렌드 보고서 · W36~W44 실데이터 기반

import type { TrafficWeeklyItem } from '@/features/sales-dashboard/models/types'
export type { TrafficWeeklyItem }

export const mockTrafficData: TrafficWeeklyItem[] = [
  { week: 'W36', paidSocial: 11206, direct: 4395, search: 3955, organicSocial: 2417, total: 21973, itemViews: 43946, itemViewsPerSession: 2.0, conversionRate: 0.8 },
  { week: 'W37', paidSocial: 9912, direct: 3965, search: 3569, organicSocial: 2377, total: 19823, itemViews: 39646, itemViewsPerSession: 2.0, conversionRate: 1.1 },
  { week: 'W38', paidSocial: 3656, direct: 1787, search: 1543, organicSocial: 1139, total:  8125, itemViews: 16250, itemViewsPerSession: 2.0, conversionRate: 1.0 },
  { week: 'W39', paidSocial: 3018, direct: 1883, search: 1358, organicSocial: 1282, total:  7541, itemViews: 15082, itemViewsPerSession: 2.0, conversionRate: 1.0 },
  { week: 'W40', paidSocial: 3623, direct: 2265, search: 1630, organicSocial: 1540, total:  9058, itemViews: 18116, itemViewsPerSession: 2.0, conversionRate: 1.0 },
  { week: 'W41', paidSocial: 3178, direct: 1987, search: 1430, organicSocial: 1352, total:  7947, itemViews: 15894, itemViewsPerSession: 2.0, conversionRate: 0.9 },
  { week: 'W42', paidSocial: 2605, direct: 1628, search: 1172, organicSocial: 1107, total:  6512, itemViews: 14126, itemViewsPerSession: 2.2, conversionRate: 1.9 },
  { week: 'W43', paidSocial: 2396, direct: 1497, search: 1078, organicSocial: 1019, total:  5990, itemViews: 14975, itemViewsPerSession: 2.5, conversionRate: 1.2 },
  { week: 'W44', paidSocial: 1699, direct: 1062, search:  764, organicSocial:  722, total:  4247, itemViews: 11481, itemViewsPerSession: 2.7, conversionRate: 1.6 },
]
