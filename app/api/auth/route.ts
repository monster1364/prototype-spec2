import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { action, password } = body

  if (action === 'logout') {
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.delete('auth_token')
    return response
  }

  if (action === 'login') {
    const accessPassword = process.env.ACCESS_PASSWORD
    if (!accessPassword) {
      return NextResponse.json({ error: 'ACCESS_PASSWORD 환경변수가 설정되지 않았습니다.' }, { status: 500 })
    }

    if (password !== accessPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const response = NextResponse.json({ ok: true })
    response.cookies.set('auth_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    })
    return response
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
