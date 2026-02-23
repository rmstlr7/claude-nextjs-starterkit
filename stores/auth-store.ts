import { User } from '@/types';
import { create } from 'zustand';

// 인증 상태 인터페이스
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // 액션
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  hydrate: (user: User | null) => void;
}

// 인증 상태 저장소
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setAuthenticated: (authenticated) =>
    set({
      isAuthenticated: authenticated,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  // 초기 로드 시 hydrate
  hydrate: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),
}));
