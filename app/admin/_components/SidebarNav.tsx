'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV_ITEMS } from '@/config/navigation';

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-3 space-y-1">
      {ADMIN_NAV_ITEMS.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className={`flex items-center rounded-lg px-4 py-2 transition
            ${
              pathname.startsWith(item.link)
                ? 'bg-muted ring-1 ring-border'
                : 'text-muted-foreground hover:text-foreground hover:ring-1 hover:ring-border'
            }
          `}
        >
          {item.text}
        </Link>
      ))}
    </nav>
  );
}
