import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

import Link from 'next/link';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { LogoutButton } from './LogoutButton';
import { Button } from './ui/button';

const UserDropdown = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className=" w-48">
        <div className="flex flex-col gap-2 bg-background rounded">
          {!session ? (
            <>
              <Link
                href="/login"
                className="px-3 py-2 rounded-md transition-colors hover:bg-muted hover:text-foreground"
              >
                Bejelentkezés
              </Link>

              <Link
                href="/signup"
                className="px-3 py-2 rounded-md transition-colors hover:bg-muted hover:text-foreground"
              >
                Regisztráció
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="px-3 py-2 rounded-md transition-colors hover:bg-muted hover:text-foreground"
              >
                Profil
              </Link>

              <Link
                href="/orders"
                className="px-3 py-2 rounded-md transition-colors hover:bg-muted hover:text-foreground"
              >
                Rendeléseim
              </Link>
              <LogoutButton></LogoutButton>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
