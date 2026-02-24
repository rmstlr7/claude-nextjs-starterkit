# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드를 작업할 때 참고하는 가이드입니다.

## 명령어

### 개발
```bash
npm run dev              # 개발 서버 시작 (http://localhost:3000)
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버 시작
npm run lint             # ESLint 검사 실행
npm run lint -- src/     # 특정 경로 린트 검사
```

## 아키텍처 개요

### 원자적 설계(Atomic Design) 컴포넌트 구조
컴포넌트는 원자적 설계 원칙에 따라 예측 가능한 계층으로 구성됩니다:

```
components/
├── ui/           [원자] shadcn/ui 자동 생성 컴포넌트 55개+ (버튼, 카드, 폼 등)
├── common/       [분자] 재사용 가능한 컴포넌트 6개 (PageHeader, StatCard, SearchBar 등)
├── layout/       [유기체] 레이아웃 조각 3개 (AppSidebar, Header, Footer)
├── sections/     [유기체] 페이지별 섹션 5개 (폼, 데이터테이블, 통계카드 등)
└── templates/    [템플릿] 레이아웃 뼈대 2개 (AuthTemplate, DashboardTemplate)
```

**컴포넌트 생성 기준:**
- `ui/`: `shadcn add <name>`으로 자동 생성 (수동 작성 금지)
- `common/`: 여러 페이지에서 재사용 (SearchBar, StatCard, ThemeToggle)
- `layout/`: 공유 레이아웃 빌딩블록 (Header, Footer, Sidebar)
- `sections/`: 기능별 또는 페이지별 섹션 (LoginForm, DataTable)
- `templates/`: 전체 페이지 레이아웃 래퍼 (children 슬롯 포함)

### 라우트 구조
Next.js App Router와 라우트 그룹으로 조직화:

```
app/
├── (auth)/           # 공개 인증 라우트 그룹
│   ├── login/
│   ├── signup/
│   └── layout.tsx    # 인증 레이아웃 (최소한의 스타일)
├── (dashboard)/      # 보호된 대시보드 그룹
│   ├── dashboard/
│   │   ├── page.tsx  # 메인 대시보드
│   │   ├── showcase/
│   │   ├── settings/
│   │   └── layout.tsx # 대시보드 레이아웃 (사이드바 포함)
├── layout.tsx        # 루트 레이아웃 (폰트 설정, 공급자)
├── page.tsx          # 루트 페이지 (/dashboard로 리다이렉트)
└── not-found.tsx     # 커스텀 404 페이지
```

## 상태 관리 & 데이터 페칭

### Zustand 스토어 (`/stores`)
간결함과 최소 보일러플레이트를 위해 Zustand를 사용한 전역 애플리케이션 상태:

- `ui-store.ts`: UI 상태 (사이드바 토글, 모달, 로딩)
- `auth-store.ts`: 사용자 인증 컨텍스트

**패턴:** `useUiStore()`, `useAuthStore()` 같은 훅으로 스토어 접근, `'use client'`를 통해 컴포넌트에서 직접 사용

**예제:**
```typescript
'use client';
const { sidebarOpen, toggleSidebar } = useUiStore();
```

### React Query (`@tanstack/react-query`)
`lib/query-client.ts`에서 설정:
- 쿼리 stale time: 5분
- 가비지 컬렉션: 10분
- 개발 환경에서 React Query DevTools 제공

**패턴:** API 호출에 `useQuery()` 또는 `useMutation()` 훅 사용

**예제:**
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json())
});

// 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['users'] });
```

### 공급자 (`/providers`)
공급자 계층 구조 (순서 중요):

1. **ThemeProvider** (next-themes): 다크모드 지원
2. **QueryProvider** (React Query): 데이터 페칭 캐시
3. **TooltipProvider** (shadcn/ui): 툴팁 컨텍스트

`app/layout.tsx`의 `<Providers>` 래퍼에서 적용

## 중앙화된 설정 & 상수

매직 문자열/숫자 방지를 위해 모든 하드코딩된 값을 중앙에서 관리:

### `constants/routes.ts`
카테고리별로 정리된 내부 애플리케이션 라우트:
```typescript
APP_ROUTES.PUBLIC.LOGIN
APP_ROUTES.DASHBOARD.HOME
APP_ROUTES.DASHBOARD.STATS  // 새로 추가된 라우트
APP_ROUTES.ERROR.NOT_FOUND
```

### `constants/api.ts`
동적 세그먼트용 헬퍼 함수가 포함된 API 엔드포인트 경로:
```typescript
API_ROUTES.AUTH.LOGIN
API_ROUTES.USERS.DETAIL(id)
API_ROUTES.DASHBOARD.STATS
```

### `constants/config.ts`
중앙화된 CONFIG 객체를 통한 환경변수 접근:
- `CONFIG.API_BASE_URL`
- `CONFIG.CACHE.QUERY_STALE_TIME`
- `CONFIG.FEATURES.DARK_MODE`

### `constants/navigation.ts`
메뉴 항목, 사이드바 네비게이션, 브레드크럼 데이터 중앙화

**예제 - disabled 메뉴 처리:**
```typescript
{
  title: '통계',
  href: APP_ROUTES.DASHBOARD.STATS,
  disabled: true,  // 아직 구현되지 않은 페이지
}
```

### `lib/validations/`
폼 검증용 Zod 스키마:
- `auth.ts`: 로그인/회원가입 폼 스키마
- `common.ts`: 재사용 가능한 검증 스키마

## 폼 & 검증

**패턴:** react-hook-form + Zod + @hookform/resolvers

1. `lib/validations/`에서 스키마 정의
2. Zod resolver와 함께 `useForm()` 훅 사용
3. `form.register()` 또는 shadcn Form 컴포넌트로 폼 필드 접근
4. `components/ui/form.tsx`의 `<Form>` 컴포넌트로 자동 오류 처리

**예제:**
```typescript
// 1. 스키마 정의 (lib/validations/auth.ts)
const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(6, '최소 6자 이상'),
});

// 2. 폼에서 사용
'use client';
const form = useForm({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '', password: '' }
});

// 3. 오류 처리
{form.formState.errors.email && (
  <span className="text-red-500">{form.formState.errors.email.message}</span>
)}
```

**검증 오류 처리:**
- Zod 오류는 자동으로 `form.formState.errors`에 저장
- shadcn `<FormMessage>` 컴포넌트로 오류 메시지 표시

## 스타일링

- **프레임워크:** Tailwind CSS 4 (PostCSS 통합)
- **UI 컴포넌트:** shadcn/ui (Tailwind 스타일링이 적용된 Radix UI 프리미티브)
- **유틸리티 함수:** `lib/utils.ts`의 `cn()`으로 Tailwind 클래스 병합 (clsx 사용)

**패턴:** JSX에 Tailwind 클래스를 직접 적용, 조건부 클래스는 `cn()`으로 안전하게 병합

**예제:**
```typescript
// 기본 스타일
<div className="flex items-center gap-2 px-3 py-2 rounded-lg">

// 조건부 스타일 (cn 사용)
<button className={cn(
  'px-3 py-2 rounded-lg transition-colors',
  isActive ? 'bg-primary text-white' : 'bg-gray-100'
)}>
  클릭
</button>
```

## 커스텀 훅 (`/hooks`)

- `useMobile()`: 모바일 뷰포트 감지
- `useDebounce()`: 값 디바운싱 (검색 입력용)
- `useLocalStorage()`: 상태를 localStorage에 저장

**Next.js 라우팅 훅:**
- `useRouter()`: 페이지 이동 및 라우트 조작
- `usePathname()`: 현재 경로명 가져오기
- `useSearchParams()`: URL 쿼리 파라미터 접근

**예제:**
```typescript
'use client';
import { useRouter, usePathname } from 'next/navigation';

const router = useRouter();
const pathname = usePathname();

// 활성 메뉴 판정
const isActive = pathname === '/dashboard';

// 페이지 이동
router.push('/dashboard/settings');
```

## TypeScript 설정

- **tsconfig.json:** 경로 별칭 `@/*`는 프로젝트 루트를 가리킴
- **대상:** ES2017 (strict mode 활성화)
- **모듈:** ESNext + bundler resolution

**임포트 패턴:** 상대 경로 대신 `@/*` 별칭 사용
```typescript
// ✅ 올바름
import { cn } from '@/lib/utils';
import { useUiStore } from '@/stores/ui-store';

// ❌ 피할 것
import { cn } from '../../../lib/utils';
```

## 주요 파일 & 책임

| 파일 | 목적 |
|------|------|
| `app/layout.tsx` | 루트 레이아웃, 폰트 설정, 글로벌 CSS, 공급자 래퍼 |
| `constants/*.ts` | 모든 하드코딩된 값 및 환경변수 접근 |
| `lib/query-client.ts` | React Query 설정 |
| `providers/index.tsx` | 공급자 합성 |
| `stores/*.ts` | 전역 상태 스토어 (Zustand) |
| `lib/validations/*.ts` | 폼 검증 스키마 (Zod) |
| `types/index.ts` | 전역 TypeScript 타입 |

**설정 파일:**
| 파일 | 목적 |
|------|------|
| `.eslintrc.json` | ESLint 규칙 설정 |
| `components.json` | shadcn/ui 컴포넌트 설정 |
| `tsconfig.json` | TypeScript 컴파일러 옵션 |
| `tailwind.config.ts` | Tailwind CSS 커스터마이징 |

## 개발 워크플로우

1. **새로운 페이지:**
   - `app/` 내에 라우트 폴더 생성
   - `page.tsx` 추가
   - 적절한 레이아웃 그룹에 할당

2. **새로운 컴포넌트:**
   - `components/{ui|common|layout|sections|templates}/`에 생성
   - shadcn 컴포넌트는 `shadcn add <name>` 사용

3. **새로운 상태:**
   - 기존 Zustand 스토어에 추가 또는 `stores/`에서 새 파일 생성

4. **새로운 API 엔드포인트:**
   - 컴포넌트에서 사용하기 전에 `constants/api.ts`에 경로 추가

5. **새로운 설정값:**
   - `constants/config.ts` (환경변수) 또는 해당 상수 파일에 추가

6. **폼 구현:**
   - `lib/validations/`에서 Zod 스키마 생성
   - react-hook-form + Zod 조합으로 구현

## 공통 패턴 & 실수 방지

### 리스트 렌더링 시 Key 선택
**문제:** `key={item.href}`를 사용했을 때 동일 href 값이 있으면 중복 key 경고 발생

**해결:** 고유한 값으로 key 지정
```typescript
// ❌ 피할 것 (동일 href면 중복 key)
{items.map((item) => (
  <div key={item.href}>{item.title}</div>
))}

// ✅ 올바름 (title은 고유값 보장)
{items.map((item) => (
  <div key={item.title}>{item.title}</div>
))}

// ✅ 최선 (index는 마지막 수단)
{items.map((item, idx) => (
  <div key={`${item.id}-${idx}`}>{item.title}</div>
))}
```

### Hydration 불일치 오류
**문제:** `next-themes`가 클라이언트에서 `<html>` class를 수정할 때 서버 HTML과 불일치 발생

**해결:** `<html>`, `<body>` 태그에 `suppressHydrationWarning` 추가
```typescript
// app/layout.tsx
<html lang="ko" suppressHydrationWarning>
  <body suppressHydrationWarning>
    <Providers>{children}</Providers>
  </body>
</html>
```

### disabled 메뉴 처리
비활성화 메뉴는 `disabled: true` 속성 설정, 스타일과 클릭 방지 추가:
```typescript
// navigation.ts에서 disabled 설정
{ title: '통계', href: '#', disabled: true }

// 렌더링 시 disabled 처리
{disabled ? 'cursor-not-allowed opacity-50' : '기본 스타일'}
{disabled && e.preventDefault()}
```

## 전역 CLAUDE.md 규칙 (이 프로젝트에서 적용됨)

이 프로젝트는 전역 CLAUDE.md 설정을 준수합니다:

- **언어:** 주석, 커밋 메시지, 문서화는 한국어
- **코드:** 변수/함수명은 영어 (코드 표준 준수)
- **들여쓰기:** 2칸
- **프레임워크:** React, Next.js
- **스타일링:** Tailwind CSS + TypeScript
- **상수:** 매직 문자열/숫자 금지, 상태 분기는 enum/Map 사용
- **API 경로:** `constants/api.ts`에서 관리
- **환경변수:** `constants/config.ts`를 통해서만 접근

## ESLint & 코드 품질

### ESLint 실행
```bash
npm run lint               # 모든 파일 검사
npm run lint -- src/      # 특정 경로 검사
npm run lint -- --fix     # 자동 수정 (가능한 경우)
```

### 자동 수정이 안 되는 오류
- 중복 import 제거
- 사용하지 않는 변수 정리
- 타입 관련 오류

이들은 수동으로 수정해야 합니다.

## 프로젝트 상태

- ✅ 완성 상태: Next.js 16 모던 웹 스타터킷
- ✅ 최근 수정: 중복 Key 경고 및 Hydration 불일치 오류 수정
- ✅ 빌드: 성공 (9개 페이지 정적 생성)
- ✅ 린트: ESLint 10.0.1 설정됨

## 다음 단계 (선택사항)

1. API 엔드포인트 구현 및 데이터 연동
2. 데이터베이스 연결 설정
3. 실제 인증 로직 구현
4. 테스트 코드 작성 (Jest, Vitest 등)
