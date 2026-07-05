import { Button } from '@/components/ui/button';
import ProductTable from './components/ProductTable';
import AdminBreadcrumbs from '../components/AdminBreadcrumbs';

const Products = () => {
  return (
    <>
      <AdminBreadcrumbs
        title="Products"
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          {
            label: 'Products',
          },
        ]}
      />

      {/* Body */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-muted-foreground">Manage your store products</p>
        </div>

        <Button>Add Product</Button>
      </div>

      {/* filters */}
      {/* table */}
      <ProductTable />
    </>
  );
};

export default Products;
