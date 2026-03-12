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
      <main className="max-w-5xl mx-auto px-6 py-12 text-center">
        <div className="text-4xl mb-4">🏗️</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Nuflaat</h1>
        <p className="text-gray-500 text-sm">아직 생성된 프로토타입이 없습니다.</p>
      </main>
    </div>
  )
}
