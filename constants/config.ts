// 환경 변수 중앙 관리
export const CONFIG = {
  // API
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT
    ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10)
    : 30000,

  // 앱 설정
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard',
  APP_DESCRIPTION:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Modern Next.js Starter Kit',

  // 기능 플래그
  FEATURES: {
    DARK_MODE: true,
    QUERY_CACHE: true,
    DEVTOOLS: process.env.NODE_ENV === 'development',
  },

  // 캐시 설정
  CACHE: {
    QUERY_STALE_TIME: 5 * 60 * 1000, // 5분
    QUERY_GC_TIME: 10 * 60 * 1000, // 10분
  },
} as const;
