import Sidebar from './_components/Sidebar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== 'super_admin') {
    redirect('/');
  }

  return (
    <div className="flex h-screen theme-admin bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
