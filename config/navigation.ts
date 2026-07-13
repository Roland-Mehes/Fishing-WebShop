export const NAV_ITEMS = [
  { text: 'Home', link: '/' },
  { text: 'Produse', link: '/products' },
  { text: 'Producatori', link: '/markak' },
  { text: 'Reduceri', link: '/akciok' },
  { text: 'Noutati', link: '/ujdonsagok' },
  { text: 'Contact', link: '/contact' },
];

export const ADMIN_NAV_ITEMS = [
  { text: 'Dashboard', link: '/no' },

  { text: 'Produse', link: '/admin/products' },
  { text: 'Categorii', link: '/admin/categories' },
  { text: 'Producatori', link: '/admin/brands' },

  { text: 'Comenzi', link: '/admin/orders' },

  { text: 'Reviews', link: '/admin/reviews' },

  { text: 'Clienti', link: '/admin/customers' },
];

export const FOOTER_ITEMS = [
  {
    title: 'Clienti',
    items: [
      { label: 'Livrare', href: '/livrare' },
      { label: 'Retur Produse', href: '/retur' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Companie',
    items: [
      { label: 'Despre noi', href: '/despre-noi' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Termeni si conditii', href: '/termeni' },
      { label: 'Confidentialitate', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
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
