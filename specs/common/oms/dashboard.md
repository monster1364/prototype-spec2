**경로:** `src/app/(auth)/common/oms/dashboard`

**문서 목적:** PM이 작성하는 정책서를 기반으로 AI가 UI 프로토타입을 생성할 수 있도록 화면 정책을 정의한다.

개발 기술 구조나 컴포넌트 설계 없이도 AI가 화면 구조, 데이터 표현 방식, 사용자 행동을 이해할 수 있도록 작성한다.

> **중요**
>
> - 이 화면에는 **별도의 Global Filter 기능이 없다.**
> - 필터링은 **Status Summary의 상세 상태 클릭**으로만 수행된다.
> - 상태 필터는 **단일 선택만 가능**하다.

> **프로토타입 기본 가정**
>
> - 최초 진입 시 기본 활성 탭은 `ORDER`이다.
> - 최초 진입 시 상세 상태는 선택되지 않은 상태이며, 현재 탭 기준 **전체 리스트**가 노출된다.
> - 탭 전환 시 이전 탭의 상세 상태 선택은 해제되고, 새 탭 기준 **전체 리스트**가 노출된다.

---

# 1. 화면 이름

**Order Dashboard**

---

# 2. 이 화면의 목적

OMS(Order Management System) 내 주문(Order), 반품(Return), 교환(Exchange)의 현재 진행 상태를 한눈에 파악할 수 있는 대시보드 화면이다.

운영팀이 실시간으로 현황을 모니터링하고, 특정 상태에 해당하는 리스트를 즉시 확인할 수 있도록 설계한다.

**이 화면이 제공해야 하는 핵심 가치**

- 현재 어떤 상태에 주문/클레임이 몰려 있는지 빠르게 파악할 수 있어야 한다.
- 완료/종결 상태는 최근 30일 기준으로 관리되어야 한다.
- 운영자가 특정 상세 상태를 클릭하면 즉시 하단 리스트로 연결되어야 한다.
- 별도 검색 필터 없이도 상태 중심 모니터링이 가능해야 한다.

---

# 3. 이 화면을 쓰는 사용자

- OMS 운영팀
- 주문/클레임 처리 담당자
- 물류 운영 담당자
- 관리자 성격의 백오피스 사용자

이 사용자는 상세 분석보다 **현황 확인 → 병목 발견 → 즉시 리스트 확인** 흐름으로 화면을 사용한다.

---

# 4. 화면 레이아웃

Order Dashboard는 다음 영역으로 구성된다.

## 4.1 Page Header Area

- 화면 제목
- `Refresh` 버튼
- `Updated at: YYYY-MM-DD HH:mm:ss` 표시

## 4.2 Tab Area

- `ORDER`
- `CLAIM`

## 4.3 Status Summary Area

현재 선택된 탭 기준으로 상태 그룹과 상세 상태별 카운트를 표시한다.

## 4.4 Order List Table Area

현재 탭과 선택된 상세 상태 기준의 리스트를 테이블로 표시한다.

---

# 5. 영역별 상세 명세

## 5.1 Page Header Area

### Purpose

사용자가 현재 보고 있는 화면이 무엇인지, 데이터가 언제 기준으로 갱신되었는지, 수동으로 다시 불러올 수 있는지를 알려주는 영역이다.

### Displayed Data

- 페이지 제목: `Order Dashboard`
- `Refresh` 버튼
- `Updated at: YYYY-MM-DD HH:mm:ss`

### Display Rules

- `Refresh` 버튼과 `Updated at`은 우측 상단에 배치한다.
- 시간은 초 단위까지 표시한다.
- `Updated at`은 마지막 데이터 조회 시점을 의미한다.

### What it tells the user

- 현재 보고 있는 대시보드 데이터가 어느 시점 기준인지 알 수 있어야 한다.
- 필요 시 운영자가 직접 최신 상태로 갱신할 수 있어야 한다.

### Interaction

- `Refresh` 클릭 시 Summary와 Table 데이터를 다시 조회한다.
- `Refresh`를 눌러도 현재 선택된 탭과 상세 상태 선택은 유지된다.

### States

- **Loading**: Refresh 버튼 비활성화 또는 로딩 표현
- **Error**: 데이터 재조회 실패 메시지와 재시도 유도

---

## 5.2 Tab Area

### Purpose

주문 영역과 클레임 영역을 분리하여 현재 어떤 운영 도메인을 보고 있는지 명확하게 보여주는 영역이다.

### Displayed Data

- `ORDER` 탭
- `CLAIM` 탭

### Display Rules

- 한 번에 하나의 탭만 활성화된다.
- 활성 탭은 시각적으로 명확히 강조한다.
- 현재 탭에 따라 Status Summary와 하단 리스트의 데이터 범위가 달라진다.

### What it tells the user

- 현재 `주문(Order)` 기준 화면인지, `클레임(Claim)` 기준 화면인지 즉시 알 수 있어야 한다.

### Interaction

- 탭 클릭 시 해당 탭의 상태 요약과 리스트를 표시한다.
- 탭 전환 시 이전 탭에서 선택한 상세 상태는 초기화된다.
- 탭 전환 후에는 새 탭 기준 전체 리스트가 노출된다.

### States

- 별도 Empty/Loading/Error는 두지 않고, 하위 영역 상태를 따른다.

---

## 5.3 Status Summary Area - ORDER 탭

### Purpose

ORDER 탭에서 주문 및 배송 관련 상태 현황을 요약하여 보여주는 영역이다.

### Displayed Data

ORDER 탭에서는 아래 3개 영역을 표시한다.

### 1) Order 영역

- **Awaiting**
    - Pending
- **In Progress**
    - Collected
    - Partly confirmed
    - Partial shipment requested
    - Shipment Requested
- **Finalized (last 30 days)**
    - Deleted
    - Canceled
    - Completed

### 2) Shipment 영역

- **In Progress**
    - Picking Requested
    - Picked
    - Packed
- **Finalized (last 30 days)**
    - Canceled
    - Picking Rejected
    - Delivered
    - Lost

### 3) Store Pickup 영역

- **In Progress**
    - Shipped
    - Prepared
- **Finalized (last 30 days)**
    - Completed
    - Canceled

### Display Rules

- 영역 단위(`Order`, `Shipment`, `Store Pickup`)로 나누어 표시한다.
- 각 영역 안에서 상태는 `Awaiting`, `In Progress`, `Finalized` 그룹으로 묶는다.
- 그룹명 옆에는 그룹 총합 카운트를 표시할 수 있다.
- 그룹 하위에는 **상세 상태명 + 해당 상태의 카운트**를 함께 표시한다.
- `Finalized` 그룹에는 `last 30 days` 레이블을 함께 표시한다.
- 그룹명 자체는 클릭할 수 없고, 하위 상세 상태만 클릭할 수 있다.
- 카운트가 `0`이어도 상태 항목은 노출한다.

### What it tells the user

- 현재 주문 처리 프로세스 중 어떤 단계에 물량이 몰려 있는지 파악할 수 있어야 한다.
- 출고/픽업/완료 상태의 분포를 빠르게 비교할 수 있어야 한다.
- 최근 30일 내 종결 상태 규모를 확인할 수 있어야 한다.

### Interaction

- 상세 상태 또는 해당 카운트를 클릭하면 하단 리스트가 **그 상태 하나로만** 필터링된다.
- 상태 필터는 단일 선택만 가능하다.
- 이미 선택된 상태와 다른 상태를 클릭하면 기존 선택은 해제되고 새 상태로 교체된다.
- 카운트가 `0`이어도 클릭 가능하며, 이 경우 하단 리스트는 Empty 상태를 표시한다.

### States

- **Loading**: 상태 카운트 영역 skeleton 또는 placeholder 표시
- **Error**: 상태 정보를 불러올 수 없다는 메시지 표시
- **Empty**: 개별 상태 카운트 `0`도 그대로 표시

---

## 5.4 Status Summary Area - CLAIM 탭

### Purpose

CLAIM 탭에서 반품, 교환, 재출고 관련 상태 현황을 요약하여 보여주는 영역이다.

### Displayed Data

CLAIM 탭에서는 아래 3개 영역을 표시한다.

### 1) Return 영역

- **Awaiting**
    - Pending
- **In Progress**
    - Pickup Requested
    - Pickup Ongoing
    - Received
- **Finalized (last 30 days)**
    - Refunded
    - Canceled

### 2) Exchange 영역

- **Awaiting**
    - Pending
- **In Progress**
    - Pickup Requested
    - Pickup Ongoing
    - Received
    - Inspected
    - Shipment Requested
- **Finalized (last 30 days)**
    - Exchanged
    - Canceled

### 3) Reshipment 영역

- **In Progress**
    - Picking Requested
    - Picked
    - Packed
- **Finalized (last 30 days)**
    - Canceled
    - Picking Rejected
    - Delivered
    - Lost

### Display Rules

- 영역 단위(`Return`, `Exchange`, `Reshipment`)로 나누어 표시한다.
- 각 영역 안에서 상태는 `Awaiting`, `In Progress`, `Finalized` 그룹으로 묶는다.
- 그룹명 옆에는 그룹 총합 카운트를 표시할 수 있다.
- 그룹 하위에는 **상세 상태명 + 해당 상태의 카운트**를 함께 표시한다.
- `Finalized` 그룹에는 `last 30 days` 레이블을 함께 표시한다.
- 그룹명 자체는 클릭할 수 없고, 하위 상세 상태만 클릭할 수 있다.
- 카운트가 `0`이어도 상태 항목은 노출한다.

### What it tells the user

- 반품/교환/재출고 클레임이 어느 단계에 머물러 있는지 파악할 수 있어야 한다.
- 클레임 처리 병목과 완료 추이를 빠르게 확인할 수 있어야 한다.

### Interaction

- 상세 상태 또는 해당 카운트를 클릭하면 하단 리스트가 **그 상태 하나로만** 필터링된다.
- 상태 필터는 단일 선택만 가능하다.
- 이미 선택된 상태와 다른 상태를 클릭하면 기존 선택은 해제되고 새 상태로 교체된다.
- 카운트가 `0`이어도 클릭 가능하며, 이 경우 하단 리스트는 Empty 상태를 표시한다.

### States

- **Loading**: 상태 카운트 영역 skeleton 또는 placeholder 표시
- **Error**: 상태 정보를 불러올 수 없다는 메시지 표시
- **Empty**: 개별 상태 카운트 `0`도 그대로 표시

---

## 5.5 Order List Table Area

### Purpose

현재 선택된 탭과 상세 상태에 해당하는 실제 리스트를 보여주는 영역이다.

운영자가 숫자만 보는 것이 아니라, 실제 어떤 주문/건이 그 상태에 속하는지 바로 확인할 수 있어야 한다.

### Displayed Data

- 현재 탭 기준 리스트 데이터
- 선택된 상세 상태가 있으면 해당 상태의 리스트
- 선택된 상세 상태가 없으면 현재 탭 기준 전체 리스트

### Display Rules

- 테이블은 OMS 관리자 화면의 표준 리스트 UI 형태를 따른다.
- 테이블 상단에는 현재 보고 있는 맥락을 알 수 있도록 제목 또는 보조 텍스트를 표시할 수 있다.
    - 예: `ORDER / All`
    - 예: `ORDER / Collected`
    - 예: `CLAIM / Pickup Requested`
- 하단 테이블은 **선택된 단일 상세 상태**로만 필터링된다.
- 페이지당 기본 표시 수량은 `20 rows`이다.
- 100개 초과 시 하단 Pagination UI를 표시한다.
- `Order No`는 링크 형태로 표시한다.

### What it tells the user

- 선택한 상태에 실제 어떤 주문/클레임 건이 속하는지 확인할 수 있어야 한다.
- 상태 요약 숫자와 실제 행 데이터가 연결되어야 한다.

### Interaction

- `Order No` 클릭 시 `Order Detail` 화면으로 이동한다.
- 페이지네이션 이동 시 현재 탭과 선택 상태는 유지된다.

### States

- **Empty**
    - 표시 문구:
        ```
        No data found
        There are no orders matching the selected status.
        ```
    - Empty 상태에서도 현재 탭과 상세 상태 선택은 유지된다.
- **Loading**
    - 테이블 skeleton 또는 row placeholder 표시
- **Error**
    - 리스트를 불러올 수 없다는 메시지와 재시도 유도

---

# 6. 테이블/리스트 컬럼

하단 리스트 테이블의 기본 컬럼은 아래와 같다.

| Column | 설명 |
| --- | --- |
| Channel | 주문 채널 (예: OWN, Amazon, Shopify 등) |
| Order No | 주문 고유 번호 |
| Order Date | 주문 생성 일시 |
| Orderer Email | 주문자 이메일 |
| Status | 현재 주문/클레임 상태 |
| Fulfillment No | 풀필먼트 고유 번호 |
| Fulfillment Status | 풀필먼트 처리 상태 (배송 출고 및 매장픽업을 통합한 이행 상태) |
| Recipient Name | 수령인 이름 |

> **변경 이력**
>
> - `Shipping Status` → `Fulfillment No` / `Fulfillment Status` 로 분리 및 명칭 변경
> - **변경 배경:** Store Pickup 방식이 추가됨에 따라 배송(Shipment) 중심의 용어가 적합하지 않아, 배송과 매장픽업을 모두 포괄하는 Fulfillment 용어로 통일함

**추가 규칙**

- `Order No`는 클릭 가능한 링크여야 한다.
- 클릭 시 `Order Detail` 화면으로 이동한다.
- `Fulfillment No`는 하나의 주문에 복수 개가 존재할 수 있으며, 이 경우 행을 분리하여 표시한다.
- `Fulfillment Status`는 해당 Fulfillment 단위의 이행 상태를 표시한다. (예: Picking Requested, Delivered, Prepared, Completed 등)

---

# 7. 상태 정의

## 7.1 ORDER 탭 상태

### Order

- Pending
- Collected
- Partly confirmed
- Partial shipment requested
- Shipment Requested
- Deleted
- Canceled
- Completed

### Shipment

- Picking Requested
- Picked
- Packed
- Canceled
- Picking Rejected
- Delivered
- Lost

### Store Pickup

- Shipped
- Prepared
- Completed
- Canceled

## 7.2 CLAIM 탭 상태

### Return

- Pending
- Pickup Requested
- Pickup Ongoing
- Received
- Refunded
- Canceled

### Exchange

- Pending
- Pickup Requested
- Pickup Ongoing
- Received
- Inspected
- Shipment Requested
- Exchanged
- Canceled

### Reshipment

- Picking Requested
- Picked
- Packed
- Canceled
- Picking Rejected
- Delivered
- Lost

---

# 8. 공통 데이터 규칙

## 8.1 카운트 기준

- 모든 상태 카운트는 **현재 시점(진입 시점) 기준**으로 집계한다.
- 주문 상태값에 변화가 생기면 대시보드 내 카운트는 자동으로 갱신된다.

## 8.2 Finalized 30일 규칙

- `Finalized` 그룹에 포함되는 상태는 **최근 30일 데이터만** 카운트 및 조회한다.
- 화면에는 `last 30 days` 레이블을 함께 표시한다.

## 8.3 필터 규칙

- 이 화면에는 **Global Filter가 없다.**
- 필터링은 **상세 상태 클릭**으로만 수행한다.
- 상태 필터는 **단일 선택만 가능**하다.
- 상세 상태를 선택하지 않은 경우 현재 탭 기준 전체 리스트를 표시한다.

## 8.4 Refresh 규칙

- `Refresh` 클릭 시 데이터를 수동 갱신한다.
- `Refresh` 후에도 현재 선택된 탭과 상세 상태 선택은 유지된다.

## 8.5 Page Reload 규칙

- 브라우저 전체 새로고침 시 활성화된 상세 상태 선택은 초기화된다.
- 초기 상태는 기본 탭(`ORDER`)과 전체 리스트 노출 상태로 돌아간다.

## 8.6 0건 상태 규칙

- 상태 카운트가 `0`이어도 클릭 가능하다.
- 클릭 시 하단 리스트는 Empty 상태를 표시한다.

---

# 9. Empty / Loading / Error 예외 상태

## 9.1 Empty

데이터가 없는 경우 아래 문구를 사용한다.

```
No data found
There are no orders matching the selected status.
```

## 9.2 Loading

- Summary 영역은 skeleton/placeholder로 표시한다.
- Table 영역은 row skeleton 또는 loading placeholder로 표시한다.
- Refresh 중에는 버튼 비활성화 또는 진행 중 표시를 한다.

## 9.3 Error

- Summary 또는 Table 데이터 조회 실패 시 영역 내 오류 메시지를 노출한다.
- 사용자가 다시 시도할 수 있도록 `Refresh` 또는 retry 동선을 제공한다.

---

# 10. 원하는 UI 톤

- Enterprise admin dashboard 스타일
- 밀도 있는 B2B 운영툴 화면
- 숫자와 상태가 잘 보이는 정보 중심 레이아웃
- 마케팅성 비주얼보다 **빠른 모니터링**에 적합한 구조
- 테이블 중심, 상태 중심, 효율 중심의 UI
- 선택된 탭, 선택된 상태, 마지막 업데이트 시간이 명확해야 한다

**권장 시각 표현**

- 상태는 badge 또는 clickable text + count 형태
- 선택된 상태는 명확하게 highlight
- Pending/Awaiting 계열은 파란 톤
- In Progress 계열은 주황 톤
- Completed/Delivered/Refunded/Exchanged 계열은 초록 톤
- Canceled/Lost/Picking Rejected 계열은 빨간 톤
- Deleted는 회색 톤

---

# 11. AI에게 원하는 산출물

AI는 이 정책서를 바탕으로 아래 산출물을 만들 수 있어야 한다.

## 11.1 프로토타입 범위

- Desktop 기준 Order Dashboard 1개 화면
- `ORDER / CLAIM` 탭 전환 구조 포함
- Header 영역 포함
- Status Summary 영역 포함
- Table 영역 포함
- Empty / Loading / Error 상태 포함

## 11.2 UI에 반드시 반영할 것

- 별도의 Global Filter 영역은 만들지 않는다
- 상세 상태 클릭으로만 리스트 필터링된다
- 상태 필터는 단일 선택이다
- `Finalized`에는 `last 30 days` 레이블이 필요하다
- `Refresh`와 `Updated at`이 상단에 보여야 한다
- `Order No`는 클릭 가능한 링크로 표현한다
- 기본 테이블 페이지 수량은 100 rows 기준이다
- 컬럼은 `Fulfillment No` / `Fulfillment Status`로 표시한다 (`Shipping Status` 사용 금지)

## 11.3 AI가 만들어야 하는 결과물 예시

- High-fidelity admin dashboard UI
- ORDER 탭 상태 요약 화면
- CLAIM 탭 상태 요약 화면
- 상태 선택 후 하단 리스트가 바뀌는 인터랙션이 드러난 화면
- Empty 상태 화면
- Loading 상태 화면
