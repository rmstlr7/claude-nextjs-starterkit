'use client';

import { ThemeToggle } from '@/components/common/ThemeToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/sections/UserMenu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center justify-between gap-4 px-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
