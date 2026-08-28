import type { Metadata } from 'next';

import { getProductBySlug } from '@/db/queries/products/details';
import { getImageUrl } from '@/lib/storage/get-image';
import { notFound } from 'next/navigation';
import ProductGallery from '../../_components/product/ProductGallery';
import ProductInfo from '../../_components/product/ProductInfo';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Nu s-a găsit produsul',
      description: 'Nu s-a găsit produsul',
      robots: { index: false, follow: false },
    };
  }

  const title = product.name;
  const description = product.description
    ? product.description.slice(0, 160)
    : `Cumpără produsul ${product.name} din magazinul nostru de pescuit!`;

  const image = getImageUrl(product.images[0]?.imageKey);

  return {
    title,
    description,
    robots: { index: true, follow: true },

    openGraph: {
      title,
      description,
      type: 'website',
      url: `/products/${slug}`,
      siteName: 'Fishing Webshop',
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 1200,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const primaryImage =
    product.images.find((image) => image.isPrimary) ?? product.images[0];

  const primaryImageUrl = getImageUrl(primaryImage?.imageKey);

  return (
    <main>
      <section>
        <ProductGallery images={product.images} />

        <ProductInfo product={product} primaryImage={primaryImageUrl} />

        {/* <ProductDescription/> */}
        {/* ProductSpecifications */}
        {/* Reviews */}
      </section>
    </main>
  );
};

export default ProductPage;
