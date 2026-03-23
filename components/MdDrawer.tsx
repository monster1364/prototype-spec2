'use client'

import { useState, useEffect, useCallback } from 'react'

interface MdDrawerProps {
  // "common/oms/dashboard" 또는 "common/oms/dashboard#page-header" 형식
  specFile: string | null
  onClose: () => void
}

// anchor(#이후 텍스트)에 해당하는 섹션만 추출
// 매칭 기준: heading 텍스트를 소문자 변환 + 특수문자 제거 후 anchor와 비교
function extractSection(md: string, anchor: string): string {
  const lines = md.split('\n')
  const normalise = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-').trim()

  const anchorNorm = normalise(anchor)

  // anchor와 매칭되는 heading 라인 인덱스 찾기
  let startIdx = -1
  let startLevel = 0
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+(.+)$/)
    if (m && normalise(m[2]).includes(anchorNorm)) {
      startIdx = i
      startLevel = m[1].length
      break
    }
  }

  if (startIdx === -1) return md // anchor 못 찾으면 전체 반환

  // 같은 레벨 이상의 다음 heading까지만 수집
  const result: string[] = []
  for (let i = startIdx; i < lines.length; i++) {
    if (i !== startIdx) {
      const m = lines[i].match(/^(#{1,6})\s+/)
      if (m && m[1].length <= startLevel) break
    }
    result.push(lines[i])
  }
  return result.join('\n')
}

function mdToHtml(md: string): string {
  return md
    .replace(/^# (.+)$/gm, '<h1 class="text-lg font-bold mt-4 mb-2 text-gray-900">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold mt-3 mb-1.5 text-gray-800">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold mt-2 mb-1 text-gray-700">$1</h3>')
    .replace(/^\| (.+) \|$/gm, (_, row) => {
      const cells = row.split(' | ').map((c: string) => c.trim())
      return `<tr>${cells.map((c: string) => `<td class="border border-gray-200 px-2 py-1 text-xs text-gray-600">${c}</td>`).join('')}</tr>`
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, (table) =>
      `<table class="w-full border-collapse mb-3 text-xs">${table}</table>`
    )
    .replace(/^- \*\*(.+?)\*\*: (.+)$/gm, '<p class="text-sm text-gray-600 mb-1"><span class="font-medium text-gray-800">$1</span>: $2</p>')
    .replace(/^- (.+)$/gm, '<li class="text-sm text-gray-600 ml-4 list-disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (list) => `<ul class="mb-2">${list}</ul>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^(?!<[a-z])(.+)$/gm, '<p class="text-sm text-gray-600 mb-2 leading-relaxed">$1</p>')
    .replace(/^---$/gm, '<hr class="my-3 border-gray-200"/>')
}

export default function MdDrawer({ specFile, onClose }: MdDrawerProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async (raw: string) => {
    setLoading(true)
    setError(null)
    try {
      const [filePath, anchor] = raw.split('#')
      const res = await fetch(`/api/spec?file=${encodeURIComponent(filePath)}`)
      if (!res.ok) throw new Error('spec 파일을 불러올 수 없습니다.')
      const data = await res.json()
      const md = anchor ? extractSection(data.content, anchor) : data.content
      setContent(mdToHtml(md))
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (specFile) fetchContent(specFile)
  }, [specFile, fetchContent])

  if (!specFile) return null

  const [filePath, anchor] = specFile.split('#')

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <span className="text-sm font-semibold text-gray-800">정책서</span>
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
          <span className="text-xs text-gray-400">
            specs/{filePath}.md{anchor ? ` #${anchor}` : ''}
          </span>
        </div>
      </div>
    </>
  )
}
