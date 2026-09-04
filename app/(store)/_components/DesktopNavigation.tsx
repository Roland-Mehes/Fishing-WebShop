'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type DesktopNavigationProps = {
  navItems: {
    text: string;
    link: string;
  }[];
};

export default function DesktopNavigation({
  navItems,
}: DesktopNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="hidden border-b border-border bg-card/40 lg:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Navigarea principală"
          className="flex items-center gap-1 overflow-x-auto py-2"
        >
          {navItems.map((item) => {
            const isActive =
              item.link === '/'
                ? pathname === '/'
                : pathname.startsWith(item.link);

            return (
              <Link
                key={item.link}
                href={item.link}
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-secondary text-primary'
                    : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground',
                )}
              >
                {item.text}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
