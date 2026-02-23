// 공통 TypeScript 타입 정의

// 사용자 관련
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// 인증 관련
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// 대시보드 통계
export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  totalConversions: number;
  trend: 'up' | 'down';
  trendPercentage: number;
}

// 활동 로그
export interface Activity {
  id: string;
  user: User;
  action: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'failed';
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지 메타 데이터
export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

// 폼 필드 에러
export interface FormFieldError {
  field: string;
  message: string;
}
