import { pgTable, serial, text, varchar, integer, json } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
});

export const clientWorkspaces = pgTable('client_workspaces', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(), // stored in cents
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  images: json('images').$type<string[]>().default([]),
  category: varchar('category', { length: 255 }).default('Uncategorized'),
});
