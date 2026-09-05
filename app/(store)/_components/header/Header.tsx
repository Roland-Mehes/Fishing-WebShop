import Logo from '@/components/Logo';
import HeaderScroll from './HeaderScroll';
import DesktopNavigation from './DesktopNavigation';
import ProductSearch from '@/app/(store)/_components/search/ProductSearch';
import UserDropdown from './UserDropdown';
import { MobileMenu } from './MobileMenu';

import { NAV_ITEMS } from '@/config/navigation';
import { CartIcon } from '@/app/(store)/_components/cart/CartIcon';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <HeaderScroll>
        {/* Top header */}
        <div className="border-b border-border">
          <div
            className="
              mx-auto flex max-w-7xl items-center gap-3
              px-4 py-3
              transition-[padding] duration-250
              sm:px-6
              lg:px-8
              group-data-[compact=true]:py-1.5
            "
          >
            {/* Logo */}
            <Logo
              size="lg"
              className="
                h-10
                transition-[height] duration-250
                sm:h-12
                lg:h-14
                group-data-[compact=true]:h-9
                sm:group-data-[compact=true]:h-10
                lg:group-data-[compact=true]:h-10
              "
            />

            {/* Desktop search */}
            <div className="hidden flex-1 justify-center px-4 lg:flex xl:px-8">
              <div className="w-full max-w-2xl">
                <ProductSearch />
              </div>
            </div>

            {/* Actions */}
            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
              <UserDropdown />

              <CartIcon />

              <MobileMenu navItems={NAV_ITEMS} />
            </div>
          </div>
        </div>

        {/* Desktop navigation */}
        <DesktopNavigation navItems={NAV_ITEMS} />

        {/* Mobile search */}
        <div
          className="
    overflow-hidden
    border-b border-border
    transition-[max-height,opacity,padding]
    duration-250
    lg:hidden
    max-h-24
    opacity-100
    group-data-[compact=true]:max-h-0
    group-data-[compact=true]:opacity-0
    group-data-[compact=true]:border-transparent
  "
        >
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            <ProductSearch />
          </div>
        </div>
      </HeaderScroll>
    </header>
  );
};

export default Header;
