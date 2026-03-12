import Link from 'next/link'

const services = [
  {
    name: 'Common',
    slug: 'common',
    description: '공통 도메인 (OMS, PIM)',
    domains: [
      { name: 'OMS', path: '/common/oms' },
      { name: 'PIM', path: '/common/pim' },
    ],
  },
  {
    name: 'Gentle Monster',
    slug: 'gentle-monster',
    description: '젠틀몬스터 서비스',
    domains: [
      { name: 'COM', path: '/gentle-monster/com' },
      { name: 'Admin', path: '/gentle-monster/admin' },
    ],
  },
  {
    name: 'Nuflaat',
    slug: 'nuflaat',
    description: '누플랫 서비스',
    domains: [],
  },
  {
    name: 'Atiissu',
    slug: 'atiissu',
    description: '아티수 서비스',
    domains: [],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Prototype Specs</h1>
            <p className="text-sm text-gray-500 mt-0.5">PM 정책서 기반 프로토타입</p>
          </div>
          <form action="/api/auth" method="POST">
            <input type="hidden" name="action" value="logout" />
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-3 py-1.5"
            >
              로그아웃
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          {services.map((service) => (
            <div key={service.slug} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{service.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{service.description}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1">
                  {service.domains.length > 0 ? `${service.domains.length}개 서비스` : '준비중'}
                </span>
              </div>

              {service.domains.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {service.domains.map((domain) => (
                    <Link
                      key={domain.path}
                      href={domain.path}
                      className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                        {domain.name}
                      </span>
                      <span className="ml-auto text-gray-400 group-hover:text-blue-500">→</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400 italic py-2">
                  아직 생성된 프로토타입이 없습니다. Notion 정책서 작성 후 Claude Code로 생성하세요.
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">작업 시작 방법</h3>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Notion 워크스페이스에서 해당 서비스/도메인 페이지 작성</li>
            <li>CLAUDE.md의 프롬프트 복붙 후 Claude Code 실행</li>
            <li>localhost:3000에서 확인 및 수정 반복</li>
            <li>Bitbucket PR 생성 → Vercel 프리뷰 URL을 관련 부서와 공유</li>
          </ol>
        </div>
      </main>
    </div>
  )
}
