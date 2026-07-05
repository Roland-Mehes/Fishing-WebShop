'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ThemeController() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;

    body.classList.remove('theme-admin');

    if (pathname.startsWith('/admin')) {
      body.classList.add('theme-admin');
    }
  }, [pathname]);

  return null;
}
