import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema';

/* =========================
    ADDRESS TYPE
    ========================= */

export const addressTypeEnum = pgEnum('address_type', [
  'shipping',
  'billing',
  'both',
]);

/* =========================
    USER ADDRESSES
    ========================= */

export const userAddresses = pgTable('user_addresses', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  fullName: varchar('full_name', { length: 255 }).notNull(),

  phone: varchar('phone', { length: 50 }),

  country: varchar('country', { length: 100 }).notNull(),

  city: varchar('city', { length: 100 }).notNull(),

  postalCode: varchar('postal_code', { length: 20 }).notNull(),

  addressLine1: varchar('address_line1', { length: 255 }).notNull(),

  addressLine2: varchar('address_line2', { length: 255 }),

  state: varchar('state', { length: 100 }),

  isDefault: boolean('is_default').default(false).notNull(),

  type: addressTypeEnum('type').default('shipping').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
