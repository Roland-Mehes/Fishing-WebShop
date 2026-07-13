import MobileSidebar from './MobileSidebar';

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border bg-background px-4">
      <MobileSidebar />

      <div className="ml-4 font-medium flex items-center justify-center flex-col">
        Admin Dashboard
      </div>
    </header>
  );
}
