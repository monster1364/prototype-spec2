# Prototype Specs — Claude Code 작업 지침

## 절대 규칙 (위반 금지)

- 외부 API 호출 금지 (Notion API 제외)
- 모든 데이터는 `mock-data/index.ts` 에서만 사용
- `/app/api` 폴더 생성 금지 (Notion fetch용 `/app/api/notion` 제외)
- DB 연결 금지
- 인증 로직 구현 금지 (UI 표현만)
- 실제품 코드 참조 금지

## 기술 스택

- Next.js 14 App Router
- Tailwind CSS
- TypeScript
- 상태관리: `useState` 만 사용

## 파일 구조 규칙

```
app/{서비스}/{플랫폼}/{도메인}/page.tsx   ← Claude Code가 생성
components/                               ← 재사용 컴포넌트
mock-data/index.ts                        ← 목업 데이터 (타입 포함)
```

## ? 버튼 연결 방법

```tsx
"use client";
import { useState } from "react";
import NotionDrawer from "@/components/NotionDrawer";
import PolicyButton from "@/components/PolicyButton";

export default function Page() {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  return (
    <div>
      <h2 className="flex items-center">
        검색 필터
        <PolicyButton notionBlock="notion.so/page-id#block-abc" onClick={setActiveBlock} />
      </h2>
      <NotionDrawer blockUrl={activeBlock} onClose={() => setActiveBlock(null)} />
    </div>
  );
}
```

---

## PM이 쓰는 프롬프트 (복붙)

### 프로토타입 신규 생성

> Notion에 정책서 작성 완료 후 아래 프롬프트를 Claude Code에 붙여넣으세요.

```
https://notion.so/{page-id} 를 읽고
app/{서비스}/{플랫폼}/{도메인}/page.tsx 를 만들어줘.

- CLAUDE.md 절대 규칙 준수
- 목업 데이터는 mock-data/index.ts 에 타입과 함께 정의
- 화면 이동은 Next.js Link 사용
- 정책서의 12. AI에게 원하는 산출물 항목을 반드시 반영
```

예시:
```
https://notion.so/abc123 를 읽고
app/common/oms/dashboard/page.tsx 를 만들어줘.

- CLAUDE.md 절대 규칙 준수
- 목업 데이터는 mock-data/index.ts 에 타입과 함께 정의
- 화면 이동은 Next.js Link 사용
- 정책서의 12. AI에게 원하는 산출물 항목을 반드시 반영
```

---

### 화면 수정

```
app/{서비스}/{플랫폼}/{도메인} 의 {화면명}에서
{수정 내용} 해줘.
Notion 페이지 https://notion.so/{page-id} 기준으로 맞춰줘.
```

### ? 버튼 연결

```
{컴포넌트명}에 ? 버튼을 추가하고
Notion 블록 링크 notion.so/{page-id}#{block-id} 와 연결해줘.
? 버튼 클릭 시 우측 드로어로 해당 Notion 블록 내용이 열려야 해.
```

### 정합성 확인

```
현재 프로토타입이 Notion 페이지
https://notion.so/{page-id} 내용과
다른 부분이 있으면 알려줘.
```

### 역방향 동기화 (실제품 변경 후)

```
notion.so/{page-id} 내용 기준으로
app/{서비스}/{플랫폼}/{도메인}/ 프로토타입 업데이트해줘.
```

---

## Notion 정책서 템플릿 (PM 작성용)

PM이 아래 구조로 Notion 페이지를 작성하면 Claude Code가 프로토타입을 생성합니다.

```
# {화면 이름}

## 1. 화면 이름
화면 명칭 및 경로 (예: common/oms/dashboard)

## 2. 이 화면의 목적
이 화면이 왜 존재하는지 1~3문장으로 설명

## 3. 이 화면을 쓰는 사용자
누가 이 화면을 사용하는지 (예: OMS 운영팀 내부 관리자)

## 4. 화면 레이아웃
화면 구성을 글로 설명 (위→아래, 좌→우 순서로)
예: "상단에 필터바, 중간에 상태 카드, 하단에 테이블"

## 5. 영역별 상세 명세
각 영역(컴포넌트)마다 아래 항목을 작성

### {영역명}
- **Purpose**: 이 영역의 역할
- **Displayed Data**: 표시되는 데이터 목록
- **Display Rules**: 표시 조건 또는 규칙
- **What it tells the user**: 사용자가 이 영역에서 얻는 정보
- **Interaction**: 클릭/입력 시 일어나는 동작 ("~하면 → ~된다" 형식)
- **States**: 이 영역이 가질 수 있는 상태 (선택됨/비선택, 활성/비활성 등)

## 6. 테이블/리스트 컬럼
| 컬럼명 | 설명 | 비고 |
| --- | --- | --- |

## 7. 필터 항목
| 필터명 | 타입 | 복수 적용 가능 여부 |
| --- | --- | --- |

## 8. 상태 정의
화면에서 사용되는 상태값 전체 목록
예: Pending, Collected, Canceled ...

## 9. 공통 데이터 규칙
날짜 포맷, 금액 단위, 빈 값 표기 등 데이터 표시 규칙

## 10. 예외 상태
| 상황 | 표시 내용 |
| --- | --- |
| Empty | 표시할 메시지 |
| Loading | 처리 방식 |
| Error | 표시할 메시지 |

## 11. 원하는 UI 톤
어드민/커머스/모바일 등 스타일 방향, 밀도, 컬러 힌트

## 12. AI에게 원하는 산출물
- 생성할 파일 경로
- 구현해야 할 인터랙션
- mock-data에 추가할 항목
- 기타 요청사항
```
