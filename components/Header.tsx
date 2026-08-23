import Link from 'next/link';

import Logo from './Logo';
import MySearch from './MySearch';
import UserDropdown from './UserDropdown';
import { MobileMenu } from './MobileMenu';

import { NAV_ITEMS } from '@/config/navigation';
import { CartIcon } from '@/app/(store)/_components/cart/CartIcon';

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

            <CartIcon />

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
