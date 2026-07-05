import { relations } from 'drizzle-orm';

import { user } from '../schemas/auth-schema';
import { userAddresses } from '../schemas/user-address-schema';

export const addressRelations = relations(userAddresses, ({ one }) => ({
  user: one(user, {
    fields: [userAddresses.userId],
    references: [user.id],
  }),
}));
