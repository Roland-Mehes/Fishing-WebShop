import Logo from './Logo';
import Link from 'next/link';

const footerSections = [
  {
    title: 'Shop',
    items: [
      { label: 'Products', href: '/products' },
      { label: 'Brands', href: '/brands' },
      { label: 'Deals', href: '/deals' },
    ],
  },
  {
    title: 'Info',
    items: [
      { label: 'Contact', href: '/contact' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Payment', href: '/payment' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Returns', href: '/returns' },
    ],
  },
  {
    title: 'Social',
    items: [
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10 text-sm text-white/60">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-2">
              Fishing gear store in Oradea. Quality, reliability, expertise.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <FooterCol key={section.title} {...section} />
            ))}
          </div>
        </div>

        <div className="mt-10 text-xs text-muted-foreground/60">
          © 2026 Garnai Zsolt Fishing Shop
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
