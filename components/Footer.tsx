import Logo from './Logo';
import Link from 'next/link';
import { FOOTER_ITEMS } from '@/config/navigation';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-md">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Magazin de articole pentru pescuit din Oradea. Lansete, mulinete,
              nade si accesorii de la producatori de top.
            </p>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>📍 Oradea, Bihor</p>
              <p>📞 +40 7xx xxx xxx</p>
              {/* <p>✉️ contact@~X_X~.ro</p> */}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_ITEMS.map((section) => (
              <FooterCol key={section.title} {...section} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:justify-between">
          © 2026 Fishing Shop
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) => {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">{title}</h4>

      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
