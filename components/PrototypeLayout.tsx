'use client'

import { useState } from 'react'
import Link from 'next/link'
import NotionDrawer from './NotionDrawer'

interface Breadcrumb {
  label: string
  href?: string
}

interface PrototypeLayoutProps {
  children: React.ReactNode
  breadcrumbs: Breadcrumb[]
  notionPageUrl?: string
}

export function useNotionDrawer() {
  const [activeBlock, setActiveBlock] = useState<string | null>(null)

  const openBlock = (blockUrl: string) => setActiveBlock(blockUrl)
  const closeBlock = () => setActiveBlock(null)

  return { activeBlock, openBlock, closeBlock }
}

export default function PrototypeLayout({
  children,
  breadcrumbs,
  notionPageUrl,
}: PrototypeLayoutProps) {
  const { activeBlock, openBlock, closeBlock } = useNotionDrawer()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="text-gray-300">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="text-gray-500 hover:text-gray-700">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 font-medium">
              프로토타입
            </span>
            {notionPageUrl && (
              <a
                href={notionPageUrl.startsWith('http') ? notionPageUrl : `https://${notionPageUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-2.5 py-1 flex items-center gap-1"
              >
                📋 정책서
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 콘텐츠 영역 — openBlock을 Context 없이 prop drilling으로 전달 */}
      {/* Claude Code가 생성하는 page.tsx에서 useNotionDrawer()를 직접 사용하거나
          openBlock prop을 컴포넌트에 전달하는 방식으로 ? 버튼을 연결합니다 */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {children}
      </main>

      {/* Notion 드로어 */}
      <NotionDrawer blockUrl={activeBlock} onClose={closeBlock} />
    </div>
  )
}

// ? 버튼과 드로어를 함께 사용하는 래퍼 컴포넌트
// page.tsx에서 직접 사용 예시:
//
// 'use client'
// import { useState } from 'react'
// import NotionDrawer from '@/components/NotionDrawer'
// import PolicyButton from '@/components/PolicyButton'
//
// export default function Page() {
//   const [activeBlock, setActiveBlock] = useState<string | null>(null)
//   return (
//     <div>
//       <h2>검색 필터 <PolicyButton notionBlock="notion.so/..." onClick={setActiveBlock} /></h2>
//       <NotionDrawer blockUrl={activeBlock} onClose={() => setActiveBlock(null)} />
//     </div>
//   )
// }
