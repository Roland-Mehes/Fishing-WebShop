import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getCustomers() {
  return db.query.user.findMany({
    where: eq(user.role, 'customer'),
    with: {
      addresses: true,
    },
  });
}

export type CustomerTableRow = Awaited<ReturnType<typeof getCustomers>>[number];
