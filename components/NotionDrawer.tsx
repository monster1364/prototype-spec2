'use client'

import { useState, useEffect, useCallback } from 'react'

interface NotionBlock {
  id: string
  type: string
  [key: string]: unknown
}

interface NotionDrawerProps {
  blockUrl: string | null
  onClose: () => void
}

function extractBlockId(notionUrl: string): string {
  // notion.so/page-id#block-abc 또는 notion.so/workspace/page-id?pvs=4#block-abc 형식 처리
  const hashPart = notionUrl.split('#')[1]
  if (hashPart) return hashPart

  // URL 마지막 세그먼트에서 블록 ID 추출
  const parts = notionUrl.split('/')
  const lastPart = parts[parts.length - 1].split('?')[0]
  return lastPart
}

function renderBlock(block: NotionBlock): string {
  const type = block.type
  const content = block[type] as { rich_text?: Array<{ plain_text: string }>; [key: string]: unknown }

  if (!content) return ''

  const text = content.rich_text?.map((t) => t.plain_text).join('') || ''

  switch (type) {
    case 'heading_1':
      return `<h1 class="text-lg font-bold mt-4 mb-2 text-gray-900">${text}</h1>`
    case 'heading_2':
      return `<h2 class="text-base font-semibold mt-3 mb-1.5 text-gray-800">${text}</h2>`
    case 'heading_3':
      return `<h3 class="text-sm font-semibold mt-2 mb-1 text-gray-700">${text}</h3>`
    case 'paragraph':
      return text ? `<p class="text-sm text-gray-600 mb-2 leading-relaxed">${text}</p>` : '<br/>'
    case 'bulleted_list_item':
      return `<li class="text-sm text-gray-600 ml-4 list-disc">${text}</li>`
    case 'numbered_list_item':
      return `<li class="text-sm text-gray-600 ml-4 list-decimal">${text}</li>`
    case 'code':
      return `<code class="block bg-gray-100 rounded p-2 text-xs font-mono text-gray-800 mb-2 overflow-x-auto">${text}</code>`
    case 'quote':
      return `<blockquote class="border-l-4 border-gray-300 pl-3 text-sm text-gray-500 italic mb-2">${text}</blockquote>`
    case 'divider':
      return `<hr class="my-3 border-gray-200"/>`
    default:
      return text ? `<p class="text-sm text-gray-600 mb-2">${text}</p>` : ''
  }
}

export default function NotionDrawer({ blockUrl, onClose }: NotionDrawerProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const blockId = extractBlockId(url)
      const res = await fetch(`/api/notion?blockId=${encodeURIComponent(blockId)}`)
      if (!res.ok) throw new Error('Notion 데이터를 불러올 수 없습니다.')
      const data = await res.json()

      const html = data.children
        .map((block: NotionBlock) => renderBlock(block))
        .join('')
      setContent(html)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (blockUrl) {
      fetchContent(blockUrl)
    }
  }, [blockUrl, fetchContent])

  if (!blockUrl) return null

  return (
    <>
      {/* 백드롭 */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* 드로어 */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <span className="text-sm font-semibold text-gray-800">Notion 정책서</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {loading && (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              불러오는 중...
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm bg-red-50 rounded-lg p-3">
              <p className="font-medium mb-1">오류</p>
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && content && (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>

        <div className="border-t border-gray-100 px-4 py-3">
          <a
            href={blockUrl.startsWith('http') ? blockUrl : `https://${blockUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Notion에서 전체 보기 →
          </a>
        </div>
      </div>
    </>
  )
}
