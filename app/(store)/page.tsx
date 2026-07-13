import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const arrays = Array(10).fill(1);

  return (
    <>
      <HeroSection />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 md:p-10">
        {arrays.map((item, idx) => (
          <ProductCard key={idx}></ProductCard>
        ))}
      </div>
    </>
  );
}
