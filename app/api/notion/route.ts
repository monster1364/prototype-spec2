import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Client } from '@notionhq/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const blockId = searchParams.get('blockId')

  if (!blockId) {
    return NextResponse.json({ error: 'blockId가 필요합니다.' }, { status: 400 })
  }

  const notionApiKey = process.env.NOTION_API_KEY
  if (!notionApiKey) {
    return NextResponse.json({ error: 'NOTION_API_KEY 환경변수가 설정되지 않았습니다.' }, { status: 500 })
  }

  try {
    const notion = new Client({ auth: notionApiKey })

    // 블록 및 하위 블록 가져오기 (페이지네이션으로 전체)
    const block = await notion.blocks.retrieve({ block_id: blockId })
    const allChildren = []
    let cursor: string | undefined = undefined
    do {
      const res = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      })
      allChildren.push(...res.results)
      cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
    } while (cursor)

    return NextResponse.json({ block, children: allChildren })
  } catch (error) {
    console.error('Notion API 오류:', error)
    return NextResponse.json({ error: 'Notion 블록을 가져오는 데 실패했습니다.' }, { status: 500 })
  }
}
