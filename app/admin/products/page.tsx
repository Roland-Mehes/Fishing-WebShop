import { Button } from '@/components/ui/button';
import {
  getProductBrands,
  getBrandSelectOptions,
} from '@/db/queries/brands/list';
import { getCategoriesSelectOptions } from '@/db/queries/categories/list';
import { getProductsCount } from '@/db/queries/products/list';
import { PRODUCT_STATUS_OPTIONS } from '@/app/admin/config/products.config';
import { DEFAULT_PAGE_SIZE } from '@/lib/pagination';
import Link from 'next/link';
import SelectFilter from '@/app/admin/_components/filters/SelectFilter';
import ProductTable from '@/app/admin/products/_components/ProductTable';
import AdminBreadcrumbs from '@/app/admin/_components/AdminBreadcrumbs';
import Pagination from '@/app/admin/_components/Pagination';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SearchInput from '@/app/admin/products/_components/SearchInput';

type ProductsProps = {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    active?: string;
    page?: string;
    search?: string;
  }>;
};

const Products = async ({ searchParams }: ProductsProps) => {
  const params = await searchParams;

  const categoryId = params.category;
  const brandId = params.brand;
  const search = params.search?.trim();

  function parseBoolean(value?: string) {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return undefined;
  }

  const active = parseBoolean(params.active);

  const page = Number(params.page ?? '1');

  const totalProducts = await getProductsCount({
    categoryId,
    brandId,
    active,
    search,
  });

  const totalPages = Math.ceil(totalProducts / DEFAULT_PAGE_SIZE);

  const categoryOptions = await getCategoriesSelectOptions();
  const brandOptions = await getBrandSelectOptions();

  return (
    <>
      <AdminBreadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          {
            label: 'Products',
          },
        ]}
      />

      {/* Body */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>

          <p className="text-muted-foreground">Manage your store products</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>

          <Button asChild>
            <Link href="/admin/products/new">Add Product</Link>
          </Button>
        </div>
      </div>

      {/* <ProductStats /> */}

      <Card className="my-6">
        <CardContent>
          <div className="space-y-3">
            <SearchInput placeholder="Search by Name, SKU , EAN" />

            <div className="flex flex-wrap gap-2">
              {/* Filter By Name */}
              <SelectFilter
                placeholder="Brand"
                paramName="brand"
                options={brandOptions}
              />
              {/*  Filter by Category*/}
              <SelectFilter
                placeholder="Category"
                paramName="category"
                options={categoryOptions}
              />
              {/* <StatusFilter /> */}

              <SelectFilter
                placeholder="Status"
                paramName="active"
                options={PRODUCT_STATUS_OPTIONS}
              />
              {/* <SortSelect /> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <ProductTable
            categoryId={categoryId}
            brandId={brandId}
            active={active}
            page={page}
            search={search}
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Pagination currentPage={page} totalPages={totalPages} />
        </CardFooter>
      </Card>
    </>
  );
};

export default Products;
