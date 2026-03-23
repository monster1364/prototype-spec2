'use client'

import { useState } from 'react'
import Link from 'next/link'
import MdDrawer from './MdDrawer'

interface Breadcrumb {
  label: string
  href?: string
}

interface PrototypeLayoutProps {
  children: React.ReactNode
  breadcrumbs: Breadcrumb[]
  specFile?: string  // e.g. "common/oms/dashboard"
}

export function useMdDrawer() {
  const [activeSpec, setActiveSpec] = useState<string | null>(null)

  const openSpec = (specFile: string) => setActiveSpec(specFile)
  const closeSpec = () => setActiveSpec(null)

  return { activeSpec, openSpec, closeSpec }
}

export default function PrototypeLayout({
  children,
  breadcrumbs,
  specFile,
}: PrototypeLayoutProps) {
  const { activeSpec, openSpec, closeSpec } = useMdDrawer()

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
            {specFile && (
              <button
                onClick={() => openSpec(specFile)}
                className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-2.5 py-1 flex items-center gap-1"
              >
                📄 정책서
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 콘텐츠 영역 */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {children}
      </main>

      <MdDrawer specFile={activeSpec} onClose={closeSpec} />
    </div>
  )
}

// ? 버튼과 드로어를 함께 사용하는 예시:
//
// 'use client'
// import { useState } from 'react'
// import MdDrawer from '@/components/MdDrawer'
// import PolicyButton from '@/components/PolicyButton'
//
// export default function Page() {
//   const [activeSpec, setActiveSpec] = useState<string | null>(null)
//   return (
//     <div>
//       <h2>검색 필터 <PolicyButton specFile="common/oms/order" onClick={setActiveSpec} /></h2>
//       <MdDrawer specFile={activeSpec} onClose={() => setActiveSpec(null)} />
//     </div>
//   )
// }
