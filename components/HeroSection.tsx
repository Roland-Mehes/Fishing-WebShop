import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="relative isolate">
      <div
        className="
      h-[70vh]
      min-h-162.5
      bg-[url('/hero2.png')]
      bg-cover
      bg-center"
      />

      <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent" />

      <div className="absolute inset-0">
        <div className="flex h-full max-w-7xl px-4 md:px-6 lg:px-8">
          {/* Content */}
          <div className="mx-auto flex h-full max-w-7xl items-center px-4 md:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block text-primary font-medium">
                Echipamente premium de pescuit
              </span>

              <h1 className="font-heading text-6xl text-white leading-tight">
                Tot ce ai nevoie pentru următoarea captură
              </h1>

              <p className="mt-6 max-w-xl text-lg text-zinc-300">
                Lansete, mulinete, fire și accesorii atent selectate pentru
                pescarii pasionați.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg">Toate Produsele</Button>

                <Button variant="outline" size="lg">
                  Vezi Reducerile <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
