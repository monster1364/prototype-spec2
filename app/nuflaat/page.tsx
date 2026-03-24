import Link from 'next/link'

export default function NuflaatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Nuflaat</span>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Nuflaat 도메인</h1>
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/nuflaat/sales"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="font-semibold text-gray-900 group-hover:text-blue-700 mb-1">Sales</div>
            <div className="text-sm text-gray-500">온라인 통합 판매 데이터 분석</div>
          </Link>
          <Link
            href="/nuflaat/marketing"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="font-semibold text-gray-900 group-hover:text-blue-700 mb-1">Marketing</div>
            <div className="text-sm text-gray-500">SNS 성과 · 외부 데이터 분석</div>
          </Link>
        </div>
      </main>
    </div>
  )
}
