import Image from 'next/image';
import Link from 'next/link';

import { getFeaturedCategories } from '@/db/queries/categories/list';
import { getImageUrl } from '@/lib/storage/get-image';

const PopularCategories = async () => {
  const categories = await getFeaturedCategories();

  return (
    <section
      aria-labelledby="popular-categories-title"
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h2
        id="popular-categories-title"
        className="text-3xl font-bold text-center mb-8"
      >
        Categorii populare
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="w-full aspect-4/3 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/30" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white drop-shadow-sm sm:text-lg">
                      {category.name}
                    </span>

                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 sm:size-8">
                      →
                    </span>
                  </div>
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
