import Link from 'next/link'

const pages = [
  { name: 'Order Dashboard', path: '/common/oms/dashboard', description: '주문/클레임 현황 대시보드' },
  { name: 'Order List', path: '/common/oms/integrated-order/order-list', description: 'Integrated Order > 주문 리스트 조회 및 관리' },
]

const commonComponents = [
  { name: 'Header', description: 'OMS 공통 헤더' },
  { name: 'Nav', description: 'OMS 공통 내비게이션' },
]

export default function OmsIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/common" className="text-gray-500 hover:text-gray-700">Common</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">OMS</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">OMS</h1>
          <p className="text-sm text-gray-500 mt-1">전체 서비스 주문 통합 관리 시스템</p>
        </div>

        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">페이지 목록</h2>
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
                <span className="ml-auto text-gray-300 group-hover:text-blue-400">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">공통 컴포넌트</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonComponents.map((comp) => (
              <div
                key={comp.name}
                className="bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className="font-medium text-gray-900">{comp.name}</div>
                <div className="text-sm text-gray-500 mt-0.5">{comp.description}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
