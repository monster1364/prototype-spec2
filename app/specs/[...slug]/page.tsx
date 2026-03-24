import { readFile } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'

marked.use({ gfm: true })

interface Props {
  params: Promise<{ slug: string[] }>
}

export default async function SpecViewerPage({ params }: Props) {
  const { slug } = await params
  const filePath = slug.join('/')

  if (!/^[a-zA-Z0-9/_-]+$/.test(filePath)) notFound()

  let md: string
  try {
    const specsRoot = path.join(process.cwd(), 'specs')
    const fullPath = path.join(specsRoot, `${filePath}.md`)
    if (!fullPath.startsWith(specsRoot)) notFound()
    md = await readFile(fullPath, 'utf-8')
  } catch {
    notFound()
  }

  const html = marked.parse(md) as string
  const prototypeUrl = `/${filePath}`

  // 브레드크럼 생성
  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/' }]
  let accumulated = '/specs'
  for (let i = 0; i < slug.length; i++) {
    accumulated += `/${slug[i]}`
    crumbs.push({ label: slug[i], href: accumulated })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <nav className="flex items-center gap-1.5 text-sm flex-1 min-w-0">
            {crumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
                {i > 0 && <span className="text-gray-300">/</span>}
                {i === crumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium truncate">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-gray-500 hover:text-gray-700 shrink-0">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
          <Link
            href={prototypeUrl}
            className="shrink-0 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
          >
            프로토타입 보기 →
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 px-8 py-8">
          <div className="md-prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          specs/{filePath}.md
        </p>
      </main>
    </div>
  )
}
