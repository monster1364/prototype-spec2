import Link from 'next/link'

export default function GentleMonsterAdminOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/gentle-monster" className="text-gray-500 hover:text-gray-700">Gentle Monster</Link>
          <span className="text-gray-300">/</span>
          <Link href="/gentle-monster/admin" className="text-gray-500 hover:text-gray-700">Admin</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">주문</span>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 font-medium">프로토타입</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏗️</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Gentle Monster Admin 주문</h1>
          <p className="text-gray-500 text-sm">
            Notion 정책서 작성 후 Claude Code로 프로토타입을 생성하세요.
          </p>
        </div>
      </main>
    </div>
  )
}
