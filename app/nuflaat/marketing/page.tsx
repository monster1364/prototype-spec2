"use client"

import Link from 'next/link'

const pages: { name: string; path: string; specPath: string; description: string; status: 'ready' | 'planned' }[] = [
  {
    name: 'Marketing Dashboard',
    path: '/nuflaat/marketing/dashboard',
    specPath: '/specs/nuflaat/marketing/dashboard',
    description: 'Instagram 성과 중심 마케팅 대시보드',
    status: 'ready',
  },
]

export default function MarketingIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/nuflaat" className="text-gray-500 hover:text-gray-700">Nuflaat</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Marketing</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Marketing</h1>
          <p className="text-sm text-gray-500 mt-1">SNS 성과 · 외부 데이터 분석</p>
        </div>

        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">페이지 목록</h2>
          {pages.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center text-gray-400 text-sm">
              아직 등록된 화면이 없습니다. specs/nuflaat/marketing/ 에 정책서를 추가하세요.
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
