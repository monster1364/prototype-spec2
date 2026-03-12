'use client'

import { useState } from 'react'
import Link from 'next/link'
import NotionDrawer from '@/components/NotionDrawer'
import PolicyButton from '@/components/PolicyButton'
import {
  mockProducts,
  PRODUCT_STATUS_LABEL,
  PRODUCT_STATUS_COLOR,
  formatPrice,
  type ProductStatus,
} from '@/mock-data'

const NOTION_BLOCKS = {
  productTable: 'notion.so/your-page-id#product-table-block',
}

export default function ProductListPage() {
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus | ''>('')

  const filtered = mockProducts.filter((product) => {
    const matchKeyword =
      !searchKeyword ||
      product.sku.includes(searchKeyword) ||
      product.name.includes(searchKeyword)
    const matchStatus = !selectedStatus || product.status === selectedStatus
    return matchKeyword && matchStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/common" className="text-gray-500 hover:text-gray-700">Common</Link>
          <span className="text-gray-300">/</span>
          <Link href="/common/pim" className="text-gray-500 hover:text-gray-700">PIM</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">상품 목록</span>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 font-medium">프로토타입</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">상품 목록</h1>
          <p className="text-sm text-gray-500 mt-1">전체 서비스의 상품을 통합 관리합니다.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="SKU, 상품명 검색"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ProductStatus | '')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">전체 상태</option>
              {(Object.keys(PRODUCT_STATUS_LABEL) as ProductStatus[]).map((status) => (
                <option key={status} value={status}>
                  {PRODUCT_STATUS_LABEL[status]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">상품 목록</h2>
            <PolicyButton notionBlock={NOTION_BLOCKS.productTable} onClick={setActiveBlock} />
            <span className="ml-auto text-xs text-gray-500">{filtered.length}건</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">SKU</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">상품명</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">카테고리</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600 text-right">가격</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600 text-right">재고</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">상태</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">서비스</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs text-gray-600">{product.sku}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{product.name}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{product.category}</td>
                  <td className="px-5 py-3 text-right font-medium text-gray-900">{formatPrice(product.price)}</td>
                  <td className="px-5 py-3 text-right text-gray-600">{product.stock.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${PRODUCT_STATUS_COLOR[product.status]}`}>
                      {PRODUCT_STATUS_LABEL[product.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{product.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <NotionDrawer blockUrl={activeBlock} onClose={() => setActiveBlock(null)} />
    </div>
  )
}
