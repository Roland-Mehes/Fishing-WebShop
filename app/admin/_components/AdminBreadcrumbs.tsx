import Link from 'next/link';

type AdminPageHeaderProps = {
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
};

const AdminBreadcrumbs = ({ breadcrumbs = [] }: AdminPageHeaderProps) => {
  return (
    <div className="h-14 border-b border-border bg-card flex items-center px-6 mb-6 rounded-sm">
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}

            {index < breadcrumbs.length - 1 && (
              <span className="text-muted-foreground">/</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBreadcrumbs;
