# Prototype Specs

## 이 레포는 무엇인가요?

PM이 Notion 정책서를 기반으로 Claude Code로 프로토타입을 만드는 공간입니다.
실제품 코드와 분리되어 있으며, 관련 부서와 화면을 보며 리뷰하는 용도로 사용합니다.

## 로컬 실행 방법

1. 레포 클론
   ```
   git clone https://{workspace}/prototype-spec2.git
   ```

2. 의존성 설치
   ```
   npm install
   ```

3. 환경변수 파일 생성
   `.env.local` 파일을 루트에 생성 후 아래 내용 입력
   ```
   NOTION_API_KEY=  (FE 개발자에게 문의)
   ACCESS_PASSWORD= (비밀번호는 팀 Slack 공지 참고)
   ```

4. 개발 서버 실행
   ```
   npm run dev
   ```

5. 브라우저에서 확인
   ```
   localhost:3000
   ```

## 작업 시작 가이드

1. Notion 워크스페이스에서 해당 서비스/도메인 페이지 작성
2. `CLAUDE.md` 의 프롬프트 복붙 후 Claude Code 실행
3. `localhost:3000` 에서 확인 및 수정 반복
4. Bitbucket PR 생성
   - 제목: `[프로토타입] {서비스} - {도메인}`
   - Vercel 프리뷰 URL을 PR 설명에 첨부

## PR 제목 규칙

| 상황 | 제목 형식 |
|------|-----------|
| 신규 생성 | `[프로토타입] nuflaat admin - sales` |
| 수정 | `[프로토타입] nuflaat admin - sales 수정` |
| 역방향 동기화 | `[프로토타입-동기화] nuflaat - sales` |

## 문의

- 기술 문제 → FE 개발자 Slack DM
- 정책 관련 → PM 채널
