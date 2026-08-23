import Link from 'next/link';
import SidebarNav from './SidebarNav';

export default function Sidebar() {
  return (
    // hidden lg:flex w-64 flex-col border-r border-border bg-card
    <aside className="admin-card fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-14 items-center border-b border-border px-6">
        <Link href="/admin" className="font-bold tracking-wide text-primary">
          SHOP ADMIN
        </Link>
      </div>

      <SidebarNav />

      <div className="border-t border-border p-4 text-xs text-muted-foreground">
        v1.0.0 admin UI
      </div>
    </aside>
  );
}
