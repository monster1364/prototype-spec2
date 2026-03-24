"use client"

import Link from 'next/link'

const pages: { name: string; path: string; specPath: string; description: string; status: 'ready' | 'planned' }[] = [
  {
    name: 'Sales Dashboard',
    path: '/common/sales/dashboard',
    specPath: '/specs/common/sales/dashboard',
    description: '오프라인 통합 판매 데이터 원페이지 대시보드',
    status: 'ready',
  },
]

export default function SalesIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/common" className="text-gray-500 hover:text-gray-700">Common</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Sales</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sales</h1>
          <p className="text-sm text-gray-500 mt-1">오프라인 통합 판매 데이터 분석 · 데이터 통합·표준화·자동화 기반</p>
        </div>

        {/* 페이지 목록 */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">페이지 목록</h2>
          {pages.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center text-gray-400 text-sm">
              아직 등록된 화면이 없습니다. specs/common/sales/ 에 정책서를 추가하세요.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {pages.map((page, i) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group"
                >
                  <span className="text-gray-300 font-mono text-sm select-none">
                    {i === pages.length - 1 ? '└─' : '├─'}
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-blue-700">{page.name}</span>
                  <span className="text-sm text-gray-400">{page.description}</span>
                  {page.status === 'planned' && (
                    <span className="text-xs bg-gray-100 text-gray-400 rounded px-1.5 py-0.5">예정</span>
                  )}
                  <span className="ml-auto flex items-center gap-2">
                    <Link
                      href={page.specPath}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-gray-400 hover:text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded transition-colors"
                    >
                      정책서
                    </Link>
                    <span className="text-gray-300 group-hover:text-blue-400">→</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
