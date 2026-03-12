import Link from 'next/link'

const platforms = [
  { name: 'COM', path: '/gentle-monster/com', description: '젠틀몬스터 커머스' },
  { name: 'Admin', path: '/gentle-monster/admin', description: '젠틀몬스터 어드민' },
]

export default function GentleMonsterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Gentle Monster</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Gentle Monster</h1>
          <p className="text-sm text-gray-500 mt-1">젠틀몬스터 서비스</p>
        </div>

        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">플랫폼</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {platforms.map((platform) => (
              <Link
                key={platform.path}
                href={platform.path}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="font-medium text-gray-900 group-hover:text-blue-700">{platform.name}</div>
                <div className="text-sm text-gray-500 mt-0.5">{platform.description}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
