import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

import Logo from './Logo';
import MySearch from './MySearch';
import UserDropdown from './UserDropdown';
import { MobileMenu } from './MobileMenu';

import { Button } from './ui/button';
import { NAV_ITEMS } from '@/config/navigation';

const Header = () => {
  return (
    <header>
      {/* Top row */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex items-center py-4 ">
          {/* Logo */}
          <Logo />

          {/* Desktop search */}
          <div className="hidden lg:flex flex-1 justify-center px-6">
            <div className="w-full max-w-2xl">
              <MySearch />
            </div>
          </div>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
            <UserDropdown />

<<<<<<< Updated upstream
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6 text-muted-foreground hover:text-foreground" />

              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                3
              </span>
            </Button>

=======
            <CartIcon />
>>>>>>> Stashed changes
            <MobileMenu navItems={NAV_ITEMS} />
          </div>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden lg:block border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-8 text-sm text-muted-foreground">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="transition-colors hover:text-foreground"
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile search */}
      <div className="lg:hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <MySearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
