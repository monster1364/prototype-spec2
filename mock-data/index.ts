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
