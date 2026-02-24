'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NAV_ITEMS } from '@/constants/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            D
          </div>
          <span className="font-semibold">Dashboard</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.disabled ? '#' : (item.href || '#')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                item.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={(e) => {
                if (item.disabled) {
                  e.preventDefault();
                }
              }}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground">
          © 2026 Dashboard. 모든 권리 보유.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
