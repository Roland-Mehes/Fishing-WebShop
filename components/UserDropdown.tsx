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

  const initials = session?.user.name
    .split(' ')
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!session ? (
          <Button variant="ghost" size="icon">
            <User className="size-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-primary/40 bg-primary/10 text-primary font-semibold hover:bg-primary/20"
          >
            {initials}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className=" w-48">
        <div className="flex flex-col gap-2 bg-background rounded">
          {!session ? (
            <>
              <Link
                href="/login"
                className="px-3 py-2 rounded-md transition-colors hover:bg-muted hover:text-foreground"
              >
                Autentificare
              </Link>

              <Link
                href="/signup"
                className="px-3 py-2 rounded-md transition-colors hover:bg-muted hover:text-foreground"
              >
                Inregistrare
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
                Comenzile mele
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
