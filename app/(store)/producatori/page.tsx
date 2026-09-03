import Link from 'next/link';

import { getShopBrands } from '@/db/queries/brands/list';
import Image from 'next/image';
import { getImageUrl } from '@/lib/storage/get-image';

export default async function BrandsPage() {
  const brands = await getShopBrands();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-12">
      {/* Brands */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Producatori</h2>

          <span className="text-sm text-muted-foreground">
            {brands.length} producator
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/producatori/${brand.slug}`}
              className="group"
            >
              <div className="flex h-36 flex-col items-center justify-center rounded-xl border bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <div className="mb-4 flex h-14 w-full items-center justify-center">
                  {brand.brandLogoUrl ? (
                    <Image
                      src={
                        getImageUrl(brand.brandLogoUrl) || './placeholder.png'
                      }
                      width={200}
                      height={200}
                      alt={brand.name}
                      className="max-h-12 max-w-35 object-contain grayscale transition-all duration-200 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="text-xl font-bold text-muted-foreground">
                      {brand.name.charAt(0)}
                    </span>
                  )}
                </div>

                <span className="text-center text-sm font-medium transition-colors group-hover:text-primary">
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
