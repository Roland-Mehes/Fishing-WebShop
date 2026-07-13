import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SearchInput from '../products/_components/SearchInput';
import { Button } from '@/components/ui/button';
import BrandTable from './_components/BrandTable';
import Link from 'next/link';

type BrandsProps = {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    active?: string;
    page?: string;
    search?: string;
  }>;
};

const Brands = async ({ searchParams }: BrandsProps) => {
  const params = await searchParams;

  const search = params.search?.trim();

  return (
    <div>
      <Card className="my-6">
        <CardContent>
          <div className="space-y-3">
            <SearchInput placeholder="Search brand" />

            <div className="flex justify-between items-center gap-2">
              <div>Toate: 127 Active: 119 Inactive: 8</div>
              <div>
                <Link href="./brands/new/">
                  <Button>Add New</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <BrandTable search={search} />
        </CardContent>
        <CardFooter className="flex justify-center">
          {/* <Pagination currentPage={page} totalPages={totalPages} /> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Brands;
