import type { Metadata } from 'next';
import '@/app/globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Garnai Zsolt Fishing Shop',
  description: 'Cele mai bune preturi din oras pentru echipamente de pescuit',
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed inset-0 bg-background" />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(18,52,59,0.35),transparent_55%),radial-gradient(circle_at_20%_30%,rgba(6,95,70,0.25),transparent_50%)]" />
      <div className="fixed inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[24px_24px]" />

      <div className="relative flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 ">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
