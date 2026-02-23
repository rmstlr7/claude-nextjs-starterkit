// API 엔드포인트 경로 중앙 관리
export const API_ROUTES = {
  // 인증 관련
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    SIGNUP: '/api/auth/signup',
    ME: '/api/auth/me',
    REFRESH: '/api/auth/refresh',
  },
  // 사용자 관련
  USERS: {
    LIST: '/api/users',
    DETAIL: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
  },
  // 대시보드
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    ACTIVITIES: '/api/dashboard/activities',
  },
} as const;
