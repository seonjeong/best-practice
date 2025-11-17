# 📘 FRONTEND MY BEST PRACTICE

## 1. 🏗️ 개발 환경 & 인프라 설정

### ✔ 기술 스택

- TypeScript
- React
- Monorepo(workspaces):
- Node / npm
  - `packages/`
    - `design-system`: UI 컴포넌트
    - `api-docs`: OpenAPI spec

  - `apps/`
    - `service`: 실제 서비스 앱

### ✔ Git

- 브랜치 네이밍 규칙
- Commit Message Format (한글/영어)
- `.gitignore`
- `CHANGELOG.md` 또는 변경 이력 포맷 (Keep a Changelog)

### ✔ Node & Monorepo

- npm workspace 사용
- version 관리
  - 버전: .nvmrc, .node-version

### ✔ TypeScript

- root `tsconfig.base.json`
- workspace별 tsconfig 계층 구조
- strict 옵션 설정
- paths(alias) 설정

### ✔ ESLint / Prettier

- AirBnB + TypeScript + Prettier
- prettier 설정 확립

### ✔ 절대경로 alias

- @design-system
- @api-docs
- @hooks / @utils / @constants / @config
- barrel(index.ts) 사용 여부 및 기준
- generate 스크립트로 boilerplate 생성 (`new-component` 등)

### ✔ workspace 별 개별 환경

- api-docs: swagger-cli
- design-system: Storybook + Sass
- service: Vite + Sass + react-router-dom
- dev/prod 환경에서도 동일한 import 경로 유지

## 2. 📂 프로젝트 구조 / 파일 전략

### ✔ Folder 구조 관점

- 도메인 중심 (features-based)
- 기능 중심 (pages / components / api / utils)
- 참고 링크: Josh Comeau, DeveloperWay, GitHub 사례

### ✔ Barrel 파일(index.ts)

- 사용 하기로 함

### ✔ 파일 & 폴더 Naming

- 확장자: `.ts` / `.tsx`
- 배열 페이지: `xxxs.tsx`
- 폴더명 복수형 사용 기준(ex) components, pages ...)
- 컴포넌트: PascalCase
- 나머지: camelCase
- 예외(generate 하는 코드): snake_case

### ✔ 기능 그룹

- 서버 요청/응답
- 상태 관리
- 설정(config/env/constants)
- 타입(type/domain)
- UI components
- pages
- features
- 테스트

### ✔ 명명 규칙

- 함수 네이밍 패턴 (onClick / handleClick / load / fetch / create / update 등)

---

## 3. 🧩 컴포넌트 설계 & 코드 컨벤션

### ✔ React import 규칙

- 값 → type import 순서
- `React.useState` vs `useState`: useState

### ✔ function vs const 컴포넌트

- 컴포넌트의 경우 function 으로
- function: 식별성, 가독성
- const: 안정성, generic 용이

### ✔ React.FC

- 사용하지 않는 방향
- 이유: children 강제, generic 문제

### ✔ Props 설계

- 같은 파일 vs 파일 분리: 파일 분리
- Props 파일명 규칙
  - Button.types.ts

- interface vs type: type
- Props naming: 기본 컴포넌트 Props 로 통일, 나머지 ComponentNameProps

### ✔ defaultProps

- function component에서는 사용 X
- deep merge 기본값 관리 전략
  - defaultOptions 상수
  - Partial props + 내부 merge

### ✔ props destructuring

```
  function __COMPONENT_NAME__(props) {
    const {} = props;
    return null;
  }
```

---

## 4. 🔧 API Layer / Data Layer 설계

### ✔ 계층 구조

```
UI (React)
↓
Service Layer (authService 등)
↓
API Wrapper (@api/user)
↓
HTTP Client (axios/fetch)
```

### ✔ 공통 API

- 공통 fetch wrapper
- 공통 useQuery
- 오류 처리
- key naming 변환(camelCase / snake_case / PascalCase)
- 서버 DTO ↔ Domain Model 변환
- request/response 타입

### ✔ Mocking

- api-docs 기반 Mock (OpenAPI → MSW handlers)
- dummy data api-docs에 넣기
- monorepo `mocks/handlers`
- same-origin 제한 규칙을 위해 api 호출시 / 상대 경로로 사용

---

## 5. 🧱 UI / Design System / CSS

### ✔ design-system 구성

- Storybook
- 공통 컴포넌트 패턴
- Polymorphic Component

### ✔ CSS

- Sass
- CSS Modules
- reset 스타일
- global style

### ✔ 이미지 & 아이콘

- 각 컴포넌트 내 images / icons 폴더

---

## 6. ⚙ 환경 변수 / Config / Constants

### ✔ config/env/.env 파일 구조

- override 순서 정리
  - config/env
    - .env
    - .env.local
    - .env.development
    - .env.test
    - .env.production
- config/env.ts 모듈에서 타입 안전 제공

### ✔ constants

- routes
- messages
- errorMessages
- queryKeys
- enums
- OAuth: config에 포함
- 디자인 토큰
- public key, app data, 성공/오류 메시지

### ✔ config vs constants

- config: 환경/배포 의존
- constants: 도메인 고정값

---

## 7. 🧭 Routing / App Flow / 상태 / UX 정책

- 작업 예정

### ✔ Router 설계

### ✔ Loading

### ✔ Error Handling

### ✔ Skeleton

### ✔ Modal

### ✔ Form

### ✔ State Management

### ✔ hooks

### ✔ 로그인

---

## 8. 📦 배포 / 자동화

- 작업 예정

# ✨ 정리 포인트
