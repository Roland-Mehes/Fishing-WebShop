type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProductLayout({ children }: LayoutProps) {
  return <div className="space-y-6">{children}</div>;
}
