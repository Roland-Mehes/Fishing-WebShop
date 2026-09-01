import {
  searchBrands,
  searchCategories,
  searchProducts,
} from '@/db/queries/search/search';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;

  const query = searchParams.get('q'?.trim() ?? '');

  if (!query) {
    return Response.json({
      products: [],
      brands: [],
      categories: [],
    });
  }

  const [products, brands, categories] = await Promise.all([
    searchProducts(query),
    searchBrands(query),
    searchCategories(query),
  ]);

  return Response.json({
    products,
    brands,
    categories,
  });
}
