import { Truck, ShieldCheck, HandCoins, BadgeCheck } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Truck,
      title: 'Livrare rapidă',
      description:
        'Expediem comenzile rapid și în siguranță, cu posibilitate de urmărire.',
    },
    {
      icon: BadgeCheck,
      title: 'Produse de calitate',
      description:
        'Selectăm produse de la producători de încredere, potrivite pentru pescari pasionați.',
    },
    {
      icon: ShieldCheck,
      title: 'Plată sigură',
      description:
        'Plătește în siguranță, folosind metodele de plată disponibile.',
    },

    {
      icon: HandCoins,
      title: 'Prețuri avantajoase',
      description:
        'Prețuri competitive, oferte speciale și reduceri la o selecție de produse.',
    },
  ];

  return (
    <section className="bg-card  px-4 py-16 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          De ce să alegi magazinul nostru?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Punem accent pe produse de calitate, servicii rapide și o experiență
          de cumpărare simplă și sigură.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-xl  p-6 text-center text-card-foreground shadow-md "
              >
                <div className="mb-4 flex justify-center">
                  <Icon size={40} strokeWidth={1.8} className="text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
