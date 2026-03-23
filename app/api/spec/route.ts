import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (!file) {
    return NextResponse.json({ error: 'file 파라미터가 필요합니다.' }, { status: 400 })
  }

  // 경로 탐색 공격 방지: 슬래시, 알파벳, 숫자, 하이픈만 허용
  if (!/^[a-zA-Z0-9/_-]+$/.test(file)) {
    return NextResponse.json({ error: '유효하지 않은 파일 경로입니다.' }, { status: 400 })
  }

  try {
    const specsRoot = path.join(process.cwd(), 'specs')
    const filePath = path.join(specsRoot, `${file}.md`)

    // specs 폴더 외부 접근 차단
    if (!filePath.startsWith(specsRoot)) {
      return NextResponse.json({ error: '접근이 허용되지 않는 경로입니다.' }, { status: 403 })
    }

    const content = await readFile(filePath, 'utf-8')
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: 'spec 파일을 찾을 수 없습니다.' }, { status: 404 })
  }
}
