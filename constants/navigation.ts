import { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  Cog,
  Home,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import { APP_ROUTES } from './routes';

// 사이드바 네비게이션 메뉴 데이터
export interface NavItem {
  title: string;
  icon?: LucideIcon;
  href?: string;
  children?: NavItem[];
  isActive?: boolean;
  disabled?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: '대시보드',
    icon: Home,
    href: APP_ROUTES.DASHBOARD.HOME,
  },
  {
    title: '컴포넌트 전시',
    icon: BookOpen,
    href: APP_ROUTES.DASHBOARD.SHOWCASE,
  },
  {
    title: '통계',
    icon: BarChart3,
    href: APP_ROUTES.DASHBOARD.STATS,
    disabled: true,
  },
  {
    title: '사용자',
    icon: Users,
    href: APP_ROUTES.DASHBOARD.USERS,
    disabled: true,
  },
  {
    title: '설정',
    icon: Cog,
    href: APP_ROUTES.DASHBOARD.SETTINGS,
  },
];

// 사용자 메뉴 (드롭다운)
export const USER_MENU_ITEMS: NavItem[] = [
  {
    title: '설정',
    icon: Settings,
    href: APP_ROUTES.DASHBOARD.SETTINGS,
  },
  {
    title: '로그아웃',
    icon: LogOut,
    href: APP_ROUTES.PUBLIC.LOGIN,
  },
];
