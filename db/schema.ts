import { relations } from 'drizzle-orm';
import {
  integer,
  timestamp,
  pgTable,
  text,
  primaryKey,
  boolean,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { AdapterAccount } from 'next-auth/adapters';

export const users = pgTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  subscriptionBought: boolean('subscriptionBought'),
  customerId: text('customerId')
});

export const accounts = pgTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId)
  })
);

export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
);

export const store = pgTable('store', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  userId: text('userId').references(() => users.id)
});

export const userToStore = relations(users, ({ one }) => ({
  store: one(store, {
    fields: [users.id],
    references: [store.userId]
  })
}));
