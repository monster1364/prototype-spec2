아래 Notion 페이지를 읽고 프로토타입을 생성해줘.

Notion URL: $ARGUMENTS

작업 순서:
1. Notion 페이지를 읽어서 화면 이름, 경로, 산출물 항목을 파악해
2. 정책서의 "1. 화면 이름" 항목에서 경로를 확인해 (예: common/oms/dashboard)
3. `app/{경로}/page.tsx` 를 생성해
4. 필요한 mock 데이터는 `mock-data/index.ts` 에 타입과 함께 추가해
5. OMS 인덱스 페이지(`app/common/oms/page.tsx`)의 pages 배열에 새 페이지를 추가해

반드시 지켜야 할 규칙 (CLAUDE.md):
- 외부 API 호출 금지
- 모든 데이터는 mock-data/index.ts 에서만 사용
- 상태관리는 useState만 사용
- 화면 이동은 Next.js Link 사용
- 정책서의 "12. AI에게 원하는 산출물" 항목을 반드시 반영

## Proto Updated At 패턴 (필수)

page.tsx 상단에 아래 두 상수를 반드시 선언해:

```ts
const NOTION_PAGE = "{Notion 페이지 URL}"
const PROTO_UPDATED_AT = "{오늘 날짜 YYYY-MM-DD HH:mm}"
```

브레드크럼 영역에 `ProtoUpdatedAt` 컴포넌트를 추가해:

```tsx
import ProtoUpdatedAt from "@/shared/components/ProtoUpdatedAt"

{/* Breadcrumb */}
<Box sx={{ ..., display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <Breadcrumbs ...>
    ...
  </Breadcrumbs>
  <ProtoUpdatedAt value={PROTO_UPDATED_AT} />
</Box>
```

`PROTO_UPDATED_AT` 값은 프로토타입을 생성하는 시점의 날짜/시간으로 설정해. (currentDate 기준)
