import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { ThemeController } from '@/hooks/ThemeSwitch';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body id="app-body" className="min-h-screen relative">
        <div className="relative flex flex-col">
          <ThemeController />
          {children}
        </div>
      </body>
    </html>
  );
}
