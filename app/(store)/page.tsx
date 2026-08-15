import HeroSection from '@/app/(store)/_components/HeroSection';
import PopularCategories from '@/app/(store)/_components/PopularCategories';
import WhyChooseUs from './_components/WhyChooseUs';
import { FeaturedProducts } from './_components/FeaturedProducts';

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularCategories />
      <WhyChooseUs />
      <FeaturedProducts />
    </>
  );
}
