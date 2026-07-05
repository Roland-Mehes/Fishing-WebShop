'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import { Button } from './ui/button';

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      {loading ? <Loader /> : 'Kijelentkezés'}
    </Button>
  );
}
