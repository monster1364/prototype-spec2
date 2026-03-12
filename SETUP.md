# SETUP.md — 초기 세팅 프롬프트 (FE 개발자용)

> 이 파일은 빈 Next.js 프로젝트에서 prototype-spec2 환경을 세팅할 때
> Claude Code에 붙여넣는 프롬프트입니다. **최초 1회만 실행합니다.**

---

## Claude Code 실행 프롬프트

```
이 레포는 PM이 Notion 정책서를 기반으로 프로토타입을 만드는 Next.js 프로젝트야.
아래 스펙대로 전체 환경을 세팅해줘.

## 기술 스택
- Next.js 14 App Router
- Tailwind CSS
- TypeScript
- @notionhq/client (Notion API)

## 생성할 파일
1. middleware.ts — 비밀번호 인증 (httpOnly 쿠키, 7일 유지)
2. app/auth/login/page.tsx — 로그인 페이지
3. app/api/auth/route.ts — 인증 API
4. app/api/notion/route.ts — Notion 블록 fetch API
5. app/layout.tsx — 루트 레이아웃
6. app/page.tsx — 서비스 인덱스 (gentle-monster, nuflaat, atiissu, common)
7. components/NotionDrawer.tsx — ? 버튼 클릭 시 열리는 우측 드로어
8. components/PolicyButton.tsx — ? 버튼 컴포넌트
9. mock-data/index.ts — 목업 데이터 (Order, Product 타입 포함)
10. CLAUDE.md — PM용 작업 지침
11. README.md — PM 온보딩 가이드
12. .env.local.example

## 접근 제어
- 모든 경로에 미들웨어 인증 적용
- /auth/login, /api/auth 는 공개
- ACCESS_PASSWORD 환경변수와 비교
- 인증 성공 시 auth_token 쿠키 발급

## Notion 드로어 동작
- PolicyButton의 notionBlock prop에 Notion 블록 URL 지정
- 클릭 시 /api/notion?blockId=xxx 호출
- 우측에서 슬라이드로 열리는 드로어에 블록 내용 렌더링
```

---

## 세팅 후 체크리스트

- [ ] `npm install` 성공
- [ ] `.env.local` 파일 생성 (`.env.local.example` 참고)
- [ ] `npm run dev` 로 `localhost:3000` 접속
- [ ] 비밀번호 입력 후 인덱스 페이지 확인
- [ ] `/common/oms/order` 에서 주문 목록 예시 화면 확인
- [ ] Bitbucket 레포 생성 후 push
- [ ] PM에게 Read/Write 권한 부여
- [ ] Vercel 연동 (환경변수 `NOTION_API_KEY`, `ACCESS_PASSWORD` 등록)
- [ ] Slack 알림 연동
