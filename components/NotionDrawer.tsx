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

// "https://notion.so/...||섹션명" 형식 파싱
function parseBlockUrl(raw: string): { url: string; section: string | null } {
  const [url, section] = raw.split('||')
  return { url, section: section || null }
}

function extractPageId(notionUrl: string): string {
  const withoutQueryAndHash = notionUrl.split('?')[0].split('#')[0]
  const lastSegment = withoutQueryAndHash.split('/').pop() || ''
  const match = lastSegment.match(/([a-f0-9]{32})$/)
  if (match) return match[1]
  return lastSegment
}

function getHeadingText(block: NotionBlock): string {
  const content = block[block.type] as { rich_text?: Array<{ plain_text: string }> }
  return content?.rich_text?.map((t) => t.plain_text).join('') || ''
}

function getHeadingLevel(type: string): number | null {
  const m = type.match(/^heading_(\d)$/)
  return m ? parseInt(m[1]) : null
}

function filterBySection(blocks: NotionBlock[], section: string): NotionBlock[] {
  const normalizedSection = section.trim().toLowerCase()

  const startIdx = blocks.findIndex((b) => {
    const level = getHeadingLevel(b.type)
    if (level === null) return false
    const text = getHeadingText(b).trim().toLowerCase()
    return text.includes(normalizedSection) || normalizedSection.includes(text)
  })

  if (startIdx === -1) return blocks

  const startLevel = getHeadingLevel(blocks[startIdx].type)!
  let endIdx = blocks.length
  for (let i = startIdx + 1; i < blocks.length; i++) {
    const level = getHeadingLevel(blocks[i].type)
    if (level !== null && level <= startLevel) {
      endIdx = i
      break
    }
  }

  return blocks.slice(startIdx, endIdx)
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
  const [sectionTitle, setSectionTitle] = useState<string | null>(null)
  const [lastEditedTime, setLastEditedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pageUrl, setPageUrl] = useState<string>('')

  const fetchContent = useCallback(async (raw: string) => {
    setLoading(true)
    setError(null)
    try {
      const { url, section } = parseBlockUrl(raw)
      setPageUrl(url)
      setSectionTitle(section)

      const pageId = extractPageId(url)
      const res = await fetch(`/api/notion?blockId=${encodeURIComponent(pageId)}`)
      if (!res.ok) throw new Error('Notion 데이터를 불러올 수 없습니다.')
      const data = await res.json()

      // 페이지 최종 수정일 추출
      const edited: string | undefined = data.block?.last_edited_time
      if (edited) {
        setLastEditedTime(
          new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit',
          }).format(new Date(edited))
        )
      }

      const blocks: NotionBlock[] = data.children
      const filtered = section ? filterBySection(blocks, section) : blocks
      setContent(filtered.map(renderBlock).join(''))
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (blockUrl) fetchContent(blockUrl)
  }, [blockUrl, fetchContent])

  if (!blockUrl) return null

  return (
    <aside className="w-80 shrink-0 border-l border-gray-200 bg-white flex flex-col sticky top-0 h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">Notion 정책서</p>
            {sectionTitle && (
              <p className="text-xs text-blue-600 font-medium">5. 영역별 상세 명세 › {sectionTitle}</p>
            )}
            {lastEditedTime && (
              <p className="text-xs text-gray-400 mt-0.5">수정: {lastEditedTime}</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
        >
          ✕
        </button>
      </div>

      {/* 본문 */}
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

      {/* 푸터 */}
      <div className="border-t border-gray-100 px-4 py-3">
        <a
          href={pageUrl.startsWith('http') ? pageUrl : `https://${pageUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
        >
          Notion에서 전체 보기 →
        </a>
      </div>
    </aside>
  )
}
