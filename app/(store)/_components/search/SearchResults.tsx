import Link from 'next/link';

import SearchProductItem from './SearchProductItem';

type SearchResultsProps = {
  results: {
    products: {
      id: string;
      name: string;
      slug: string;
      imageUrl: string | null;
      price: number;
    }[];
    brands: {
      id: string;
      name: string;
      slug: string;
    }[];
    categories: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  isLoading: boolean;
  onSelect: () => void;
};

const SearchResults = ({
  results,
  isLoading,
  onSelect,
}: SearchResultsProps) => {
  const hasResults =
    results.products.length > 0 ||
    results.brands.length > 0 ||
    results.categories.length > 0;

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="space-y-3">
          <div className="h-10 animate-pulse rounded-md bg-muted" />
          <div className="h-10 animate-pulse rounded-md bg-muted" />
          <div className="h-10 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm font-medium">Nu au fost găsite rezultate</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Încearcă un alt termen de căutare.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto py-2">
      {/* Products */}
      {results.products.length > 0 && (
        <section>
          <div className="px-4 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Produse
            </p>
          </div>

          <div>
            {results.products.map((product) => (
              <SearchProductItem
                key={product.id}
                product={product}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
      )}

      {/* Brands */}
      {results.brands.length > 0 && (
        <section className="mt-2 border-t border-border pt-2">
          <div className="px-4 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Producători
            </p>
          </div>

          {results.brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              onClick={onSelect}
              className="
                block
                px-4
                py-2
                text-sm
                transition-colors
                hover:bg-muted
              "
            >
              {brand.name}
            </Link>
          ))}
        </section>
      )}

      {/* Categories */}
      {results.categories.length > 0 && (
        <section className="mt-2 border-t border-border pt-2">
          <div className="px-4 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Categorii
            </p>
          </div>

          {results.categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              onClick={onSelect}
              className="
                block
                px-4
                py-2
                text-sm
                transition-colors
                hover:bg-muted
              "
            >
              {category.name}
            </Link>
          ))}
        </section>
      )}
    </div>
  );
};

export default SearchResults;
