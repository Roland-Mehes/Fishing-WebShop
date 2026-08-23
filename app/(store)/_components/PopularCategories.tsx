import Image from 'next/image';
import Link from 'next/link';

const PopularCategories = () => {
  const categories = [
    {
      name: 'Lansete',
      slug: 'lansete',
      img: '/lansete.webp',
    },
    {
      name: 'Mulinete',
      slug: 'mulinete',
      img: '/placeholder.png',
    },
    {
      name: 'Fire',
      slug: 'fire',
      img: '/placeholder.png',
    },
    {
      name: 'Momeli',
      slug: 'momeli',
      img: '/placeholder.png',
    },
    {
      name: 'Accesorii',
      slug: 'accesorii',
      img: '/placeholder.png',
    },
    {
      name: 'Crap',
      slug: 'crap',
      img: '/placeholder.png',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Categorii populare
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/shop/${category.name.toLowerCase().replace(' ', '-')}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                height={256}
                width={256}
                src={category.img}
                alt={category.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                <span className="text-white font-semibold text-lg">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
