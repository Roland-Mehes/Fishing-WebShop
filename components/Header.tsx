import Link from 'next/link';

import Logo from './Logo';
import MySearch from '../app/(store)/_components/search/MySearch';
import UserDropdown from './UserDropdown';
import { MobileMenu } from './MobileMenu';

import { NAV_ITEMS } from '@/config/navigation';
import { CartIcon } from '@/app/(store)/_components/cart/CartIcon';

const Header = () => {
  return (
    <header className="w-full">
      {/* Top row */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop search */}
          <div className="hidden flex-1 justify-center px-4 lg:flex xl:px-8">
            <div className="w-full max-w-2xl">
              <MySearch />
            </div>
          </div>

          {/* Right side actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <UserDropdown />

            <CartIcon />

            <div className="lg:hidden">
              <MobileMenu navItems={NAV_ITEMS} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden border-b border-border bg-card/30 lg:block">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 ">
          <nav className="flex items-center gap-6 overflow-x-auto py-3 text-sm text-muted-foreground xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="shrink-0 whitespace-nowrap transition-colors hover:text-foreground"
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile search */}
      <div className="lg:hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <MySearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
