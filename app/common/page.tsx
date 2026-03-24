import Link from 'next/link'

const domains = [
  { name: 'OMS', path: '/common/oms', description: '전체 서비스 주문 통합 관리' },
  { name: 'PIM', path: '/common/pim', description: '전체 서비스 상품 통합 관리' },
]

export default function CommonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Common</span>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Common 도메인</h1>
        <div className="grid grid-cols-2 gap-4">
          {domains.map((domain) => (
            <Link
              key={domain.path}
              href={domain.path}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <div className="font-semibold text-gray-900 group-hover:text-blue-700 mb-1">{domain.name}</div>
              <div className="text-sm text-gray-500">{domain.description}</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
