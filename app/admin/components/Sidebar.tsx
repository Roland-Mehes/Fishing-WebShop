'use client';
import { ADMIN_NAV_ITEMS } from '@/config/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside
      className="w-64
  h-full
  bg-card
  border-r
  border-border
  flex flex-col"
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-6 border-b border-border">
        <div className="text-primary font-bold tracking-wide">
          <Link href={'/admin'}>SHOP ADMIN</Link>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1">
        {ADMIN_NAV_ITEMS.map((item, idx) => (
          <Link
            className={`flex flex-row px-4 py-2 rounded-lg
              text-muted-foreground
              
              transition
              cursor-pointer
              ${
                !pathname.startsWith(item.link)
                  ? 'hover:ring-1 hover:ring-border hover:text-foreground'
                  : ''
              } 
              ${pathname.startsWith(item.link) ? 'bg-muted ring-1 ring-border' : ''}
              `}
            href={item.link}
            key={item.text + idx}
          >
            {item.text}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        v1.0.0 admin UI
      </div>
    </aside>
  );
}
