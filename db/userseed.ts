import 'dotenv/config';
import { db } from './index';

import { user } from './schemas/auth-schema';
import { userAddresses } from './schemas/user-address-schema';

function randomItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsers(count: number) {
  return Array.from({ length: count }).map((_, i) => {
    const id = `user_${i + 1}`;

    return {
      id,
      name: `User ${i + 1}`,
      email: `user${i + 1}@test.com`,
      emailVerified: true,
      image: null,
      role: 'customer' as const,
    };
  });
}

function generateAddress(userId: string, i: number) {
  const cities = ['Budapest', 'Debrecen', 'Szeged', 'Pécs', 'Győr'];
  const streets = [
    'Fő utca',
    'Kossuth Lajos utca',
    'Petőfi utca',
    'Ady Endre utca',
  ];

  return {
    userId,
    fullName: `User ${i}`,
    phone: `+36 30 ${100 + i} ${200 + i}`,
    country: 'Hungary',
    city: randomItem(cities),
    postalCode: `${1000 + i}`,
    addressLine1: `${randomItem(streets)} ${i}`,
    addressLine2: null,
    state: null,
    isDefault: true,
    type: 'shipping' as const,
  };
}

async function seedUsers() {
  console.log('👤 Seeding users + addresses...');

  const users = generateUsers(20);

  // 1. insert users
  await db.insert(user).values(users);

  // 2. insert addresses
  const addresses = users.map((u, i) => generateAddress(u.id, i + 1));

  await db.insert(userAddresses).values(addresses);

  console.log('✅ 20 users + 20 addresses seeded');
  process.exit(0);
}

seedUsers();
