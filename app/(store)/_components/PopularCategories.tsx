import Image from 'next/image';
import Link from 'next/link';

import { getFeaturedCategories } from '@/db/queries/categories/list';
import { getImageUrl } from '@/lib/storage/get-image';

const PopularCategories = async () => {
  const categories = await getFeaturedCategories();

  return (
    <section
      aria-labelledby="popular-categories-title"
      className="max-w-7xl mx-auto py-8 px-4"
    >
      <h2
        id="popular-categories-title"
        className="text-3xl font-bold text-center mb-8"
      >
        Categorii populare
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const imageUrl = getImageUrl(category.imageKey);

          return (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  height={512}
                  width={512}
                  src={imageUrl || '/placeholder.png'}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-5 text-lg font-semibold text-white">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategories;
