import { create } from 'zustand';

// UI 상태 인터페이스
interface UiState {
  // 사이드바 상태
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // 모달 상태
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  closeModal: () => void;

  // 로딩 상태
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

// UI 상태 저장소
export const useUiStore = create<UiState>((set) => ({
  // 사이드바
  isSidebarOpen: true,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // 모달
  isModalOpen: false,
  setModalOpen: (open) => set({ isModalOpen: open }),
  closeModal: () => set({ isModalOpen: false }),

  // 로딩
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
