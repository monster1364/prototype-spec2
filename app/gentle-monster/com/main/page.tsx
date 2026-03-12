import Link from 'next/link'

// Gentle Monster COM 메인 — 예시 프로토타입
// PM이 Notion 정책서 작성 후 Claude Code로 실제 내용을 채웁니다

export default function GentleMonsterMainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/gentle-monster" className="text-gray-500 hover:text-gray-700">Gentle Monster</Link>
          <span className="text-gray-300">/</span>
          <Link href="/gentle-monster/com" className="text-gray-500 hover:text-gray-700">COM</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">메인</span>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 font-medium">프로토타입</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏗️</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Gentle Monster COM 메인</h1>
          <p className="text-gray-500 text-sm mb-6">
            Notion 정책서를 작성하고 Claude Code에 아래 프롬프트로 요청하세요.
          </p>
          <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-left text-sm font-mono max-w-lg mx-auto">
            <p className="text-gray-400 mb-2"># CLAUDE.md 프롬프트</p>
            <p>https://notion.so/{'{'}<span className="text-yellow-400">page-id</span>{'}'} 를 읽고</p>
            <p>app/gentle-monster/com/main/ 에</p>
            <p>Next.js 프로토타입을 만들어줘.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
