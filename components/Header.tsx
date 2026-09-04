import Link from 'next/link';

import Logo from './Logo';
import ProductSearch from '../app/(store)/_components/search/ProductSearch';
import UserDropdown from './UserDropdown';
import { MobileMenu } from '../app/(store)/_components/MobileMenu';

import { NAV_ITEMS } from '@/config/navigation';
import { CartIcon } from '@/app/(store)/_components/cart/CartIcon';
import DesktopNavigation from '@/app/(store)/_components/DesktopNavigation';

const Header = () => {
  return (
    <header className="w-full">
      {/* Top row */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo size="lg" className="h-10 sm:h-12 lg:h-14" />

          {/* Desktop search */}
          <div className="hidden flex-1 justify-center px-4 lg:flex xl:px-8">
            <div className="w-full max-w-2xl">
              <ProductSearch />
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
      <DesktopNavigation navItems={NAV_ITEMS} />

      {/* Mobile search */}
      <div className="lg:hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <ProductSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
