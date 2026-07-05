import { relations } from 'drizzle-orm';

import { user } from '../schemas/auth-schema';
import { session } from '../schemas/auth-schema';
import { account } from '../schemas/auth-schema';
import { userAddresses } from '../schemas/user-address-schema';

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  addresses: many(userAddresses),
}));
