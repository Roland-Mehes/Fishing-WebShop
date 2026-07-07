import { db } from '@/db';
import { user } from '@/db/schema';
import { eq, and, ilike, or } from 'drizzle-orm';

type CustomFilters = {
  search?: string;
};

export async function getCustomers({ search }: CustomFilters) {
  const filters = [eq(user.role, 'customer')];

  if (search?.trim()) {
    const searchFilter = or(
      ilike(user.name, `%${search}%`),
      ilike(user.email, `%${search}%`),
    );

    if (searchFilter) {
      filters.push(searchFilter);
    }
  }

  return db.query.user.findMany({
    where: and(...filters),
    with: {
      addresses: true,
    },
  });
}

export type CustomerListItem = Awaited<ReturnType<typeof getCustomers>>[number];
