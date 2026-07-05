import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BulkActionSelector from './BulkAction';
import Pagination from './Pagination';
import { getProducts, getActiveProductsCount } from '@/db/queries/products';
import { ProductTableRow } from './ProductTableRow';

const ProductTable = async () => {
  const data = await getProducts();
  const totalProduct = data.length;
  const activeProducts = await getActiveProductsCount();

  return (
    <div className="grid gap-6">
      {/* INFO & Search */}
      <div className="flex justify-between">
        <div>
          Total: {totalProduct} | Publicate: {activeProducts} | Ciorne: 160
        </div>
        <div className="flex gap-2">
          <Input className="bg-input" />
          <Button>Caute Produse</Button>
        </div>
      </div>

      {/* SORT */}
      <div className="flex justify-between">
        <BulkActionSelector />
        <Pagination />
      </div>
      {/* TABLE */}
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>EAN</TableHead>
            <TableHead>Stoc</TableHead>
            <TableHead>Pret</TableHead>
            <TableHead>Categorii</TableHead>
            <TableHead>Titlu SEO</TableHead>
            <TableHead>Descriere meta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <ProductTableRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
