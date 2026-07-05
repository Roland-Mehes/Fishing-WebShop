import 'dotenv/config';
import { db } from './index';
import {
  brands,
  categories,
  products,
  productImages,
  productVariants,
  productVariantAttributes,
  productAttributes,
  attributeDefinitions,
  discounts,
  reviews,
  user,
  session,
  account,
} from './schema';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function seed() {
  console.log('Seeding...');

  await db.delete(session);
  await db.delete(account);

  await db.delete(reviews);
  await db.delete(user);

  await db.delete(discounts);
  await db.delete(productVariantAttributes);
  await db.delete(productVariants);
  await db.delete(productImages);
  await db.delete(productAttributes);

  await db.delete(products);
  await db.delete(categories);
  await db.delete(brands);
  await db.delete(attributeDefinitions);

  const attrs = await db
    .insert(attributeDefinitions)
    .values([
      { name: 'Méret', slug: 'meret' },
      { name: 'Dobósúly', slug: 'dobosuly', unit: 'g' },
      { name: 'Hossz', slug: 'hossz', unit: 'cm' },
      { name: 'Átmérő', slug: 'atmero', unit: 'mm' },
      { name: 'Kiszerelés', slug: 'kiszereles' },
    ])
    .returning();

  const attrMap = Object.fromEntries(attrs.map((a) => [a.slug, a]));

  const brandRows = await db
    .insert(brands)
    .values([
      { name: 'Benzár Mix', slug: 'benzar-mix' },
      { name: 'Guru', slug: 'guru' },
      { name: 'Matrix', slug: 'matrix' },
      { name: 'Shimano', slug: 'shimano' },
      { name: 'Cralusso', slug: 'cralusso' },
      { name: 'Preston Innovations', slug: 'preston-innovations' },
    ])
    .returning();

  const brandMap = Object.fromEntries(brandRows.map((b) => [b.name, b]));

  const rootCats = await db
    .insert(categories)
    .values([
      { name: 'Botok', slug: 'botok' },
      { name: 'Orsók', slug: 'orsok' },
      { name: 'Horgok', slug: 'horgok' },
      { name: 'Zsinórok', slug: 'zsinorok' },
      { name: 'Etetőanyagok', slug: 'etetanyagok' },
      { name: 'Kosarak', slug: 'kosarak' },
    ])
    .returning();

  const rootMap = Object.fromEntries(rootCats.map((c) => [c.name, c]));

  const subCats = await db
    .insert(categories)
    .values([
      {
        name: 'Feeder botok',
        slug: 'feeder-botok',
        parentId: rootMap['Botok'].id,
      },
      {
        name: 'Match botok',
        slug: 'match-botok',
        parentId: rootMap['Botok'].id,
      },
      {
        name: 'Feeder orsók',
        slug: 'feeder-orsok',
        parentId: rootMap['Orsók'].id,
      },
      {
        name: 'Szakáll nélküli horgok',
        slug: 'szakall-nelkuli-horgok',
        parentId: rootMap['Horgok'].id,
      },
      {
        name: 'Monofil zsinórok',
        slug: 'monofil-zsinorok',
        parentId: rootMap['Zsinórok'].id,
      },
      {
        name: 'Fonott zsinórok',
        slug: 'fonott-zsinorok',
        parentId: rootMap['Zsinórok'].id,
      },
      {
        name: 'Method mixek',
        slug: 'method-mixek',
        parentId: rootMap['Etetőanyagok'].id,
      },
      {
        name: 'Method kosarak',
        slug: 'method-kosarak',
        parentId: rootMap['Kosarak'].id,
      },
    ])
    .returning();

  const catMap = Object.fromEntries(subCats.map((c) => [c.name, c]));

  const productDefs = [
    ['Guru', 'Szakáll nélküli horgok', 'Guru Super LWG Barbless'],
    ['Guru', 'Szakáll nélküli horgok', 'Guru QM1 Barbless'],
    ['Benzár Mix', 'Feeder botok', 'Benzár Concourse Method Feeder 360'],
    ['Matrix', 'Feeder botok', 'Matrix Horizon X Pro Feeder'],
    ['Shimano', 'Match botok', 'Shimano Aero X3 Match'],
    ['Preston Innovations', 'Match botok', 'Preston Supera X Match'],
    ['Shimano', 'Feeder orsók', 'Shimano Baitrunner ST'],
    ['Matrix', 'Feeder orsók', 'Matrix Aquos Ultra Reel'],
    ['Cralusso', 'Monofil zsinórok', 'Cralusso Feeder Mono'],
    ['Guru', 'Fonott zsinórok', 'Guru Pulse8 Braid'],
    ['Benzár Mix', 'Method mixek', 'Benzár Method Mix Green Betaine'],
    ['Benzár Mix', 'Method mixek', 'Benzár Turbo Black'],
    ['Guru', 'Method kosarak', 'Guru Method Feeder Large'],
    ['Cralusso', 'Method kosarak', 'Cralusso Method Basket'],
  ];

  const demoUsers = await db
    .insert(user)
    .values([
      {
        id: 'seed-user-1',
        name: 'Kovács Péter',
        email: 'peter@example.com',
        role: 'customer',
        emailVerified: true,
      },
      {
        id: 'seed-user-2',
        name: 'Nagy Gábor',
        email: 'gabor@example.com',
        role: 'customer',
        emailVerified: true,
      },
      {
        id: 'seed-admin',
        name: 'Admin',
        email: 'admin@example.com',
        role: 'super_admin',
        emailVerified: true,
      },
    ])
    .returning();

  const userMap = Object.fromEntries(demoUsers.map((u) => [u.id, u]));

  await db.insert(account).values([
    {
      id: 'account-1',
      accountId: 'peter@example.com',
      providerId: 'credentials',
      userId: userMap['seed-user-1'].id,
      password: '$2b$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
    {
      id: 'account-2',
      accountId: 'gabor@example.com',
      providerId: 'credentials',
      userId: userMap['seed-user-2'].id,
      password: '$2b$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
    {
      id: 'account-admin',
      accountId: 'admin@example.com',
      providerId: 'credentials',
      userId: 'seed-admin',
      password: 'admin',
    },
  ]);

  for (const [brand, category, name] of productDefs) {
    const [product] = await db
      .insert(products)
      .values({
        brandId: brandMap[brand].id,
        categoryId: catMap[category].id,
        name,
        slug: slugify(name),
        shortDescription: `${name} prémium horgász termék.`,
        description: `${name} részletes bemutató szöveg.`,
        ratingAverage: 4.8,
        ratingCount: 2,
      })
      .returning();

    await db.insert(productImages).values({
      productId: product.id,
      imageUrl: `kep-${name}.jpg`,
      alt: name,
      isPrimary: true,
    });

    await db.insert(reviews).values([
      {
        productId: product.id,
        userId: userMap['seed-user-1'].id,
        rating: 5,
        title: 'Kiváló minőség',
        comment: 'Nagyon bevált a vízparton.',
        approved: true,
      },
      {
        productId: product.id,
        userId: userMap['seed-user-1'].id,
        rating: 4,
        title: 'Ajánlott',
        comment: 'Jó ár-érték arány.',
        approved: true,
      },
    ]);
  }

  console.log('Seed finished.');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
