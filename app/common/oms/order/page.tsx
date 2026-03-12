'use client'

import { useState } from 'react'
import Link from 'next/link'
import NotionDrawer from '@/components/NotionDrawer'
import PolicyButton from '@/components/PolicyButton'
import {
  mockOrders,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_COLOR,
  formatPrice,
  formatDate,
  type OrderStatus,
} from '@/mock-data'

// PM이 정책서 Notion 페이지 URL로 교체하세요 (블록 링크 불필요, 페이지 URL 하나면 됩니다)
const NOTION_PAGE_URL = 'https://www.notion.so/your-page-url'

export default function OrderListPage() {
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('')

  const filtered = mockOrders.filter((order) => {
    const matchKeyword =
      !searchKeyword ||
      order.orderNumber.includes(searchKeyword) ||
      order.customerName.includes(searchKeyword)
    const matchStatus = !selectedStatus || order.status === selectedStatus
    return matchKeyword && matchStatus
  })

  return (
    <div className="flex min-h-screen">
    <div className="flex-1 min-w-0 bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/common" className="text-gray-500 hover:text-gray-700">Common</Link>
          <span className="text-gray-300">/</span>
          <Link href="/common/oms" className="text-gray-500 hover:text-gray-700">OMS</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">주문 목록</span>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 font-medium">프로토타입</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">주문 목록</h1>
          <p className="text-sm text-gray-500 mt-1">전체 서비스의 주문을 통합 관리합니다.</p>
        </div>

        {/* 검색 필터 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-semibold text-gray-700">검색 필터</h2>
            <PolicyButton notionBlock={NOTION_PAGE_URL} onClick={setActiveBlock} />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="주문번호, 주문자 검색"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | '')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">전체 상태</option>
              {(Object.keys(ORDER_STATUS_LABEL) as OrderStatus[]).map((status) => (
                <option key={status} value={status}>
                  {ORDER_STATUS_LABEL[status]}
                </option>
              ))}
            </select>
            <button
              onClick={() => { setSearchKeyword(''); setSelectedStatus('') }}
              className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-2"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 주문 테이블 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-700">주문 목록</h2>
              <PolicyButton notionBlock={NOTION_PAGE_URL} onClick={setActiveBlock} />
            </div>
            <span className="text-xs text-gray-500">{filtered.length}건</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold text-gray-600 w-40">주문번호</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">주문자</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">
                  <div className="flex items-center gap-1">
                    상태
                    <PolicyButton notionBlock={NOTION_PAGE_URL} onClick={setActiveBlock} />
                  </div>
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">서비스</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600 text-right">금액</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">주문일시</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">
                    조회된 주문이 없습니다.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-5 py-3 font-mono text-xs text-blue-600 cursor-pointer hover:underline">
                      {order.orderNumber}
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-gray-900 font-medium">{order.customerName}</div>
                      <div className="text-xs text-gray-400">{order.customerEmail}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ORDER_STATUS_COLOR[order.status]}`}>
                        {ORDER_STATUS_LABEL[order.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600 text-xs">{order.service}</td>
                    <td className="px-5 py-3 text-right font-medium text-gray-900">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{formatDate(order.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

    </div>{/* end 프로토타입 메인 영역 */}

      {/* 정책서 사이드 패널 */}
      <NotionDrawer blockUrl={activeBlock} onClose={() => setActiveBlock(null)} />
    </div>
  )
}
