// 내부 라우트 경로 중앙 관리
export const APP_ROUTES = {
  // 공개 라우트
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
  },

  // 보호된 라우트 (대시보드)
  DASHBOARD: {
    ROOT: '/dashboard',
    HOME: '/dashboard',
    SHOWCASE: '/dashboard/showcase',
    STATS: '/dashboard/stats',
    USERS: '/dashboard/users',
    SETTINGS: '/dashboard/settings',
  },

  // 관리자 라우트
  ADMIN: {
    ROOT: '/admin',
  },

  // 에러 라우트
  ERROR: {
    NOT_FOUND: '/not-found',
    UNAUTHORIZED: '/unauthorized',
    SERVER_ERROR: '/server-error',
  },
} as const;
