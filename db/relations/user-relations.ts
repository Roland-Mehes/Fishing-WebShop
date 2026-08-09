import { relations } from 'drizzle-orm';

import { user, session, account } from '../schemas/auth-schema';
import { userAddresses } from '../schemas/user-address-schema';

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  addresses: many(userAddresses),
}));

export const addressRelations = relations(userAddresses, ({ one }) => ({
  user: one(user, {
    fields: [userAddresses.userId],
    references: [user.id],
  }),
}));
