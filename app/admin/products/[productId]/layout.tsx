import { getProductById } from '@/db/queries/products/list';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ productId: string }>;
};

export default async function ProductLayout({ children, params }: LayoutProps) {
  const { productId } = await params;

  const product = await getProductById(productId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>

      {children}
    </div>
  );
}
