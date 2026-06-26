import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// For Next.js Server Actions and edge compat, we might need a connection pool or simple client.
// Here we use postgres.js
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Abdlazeez1432001@localhost:5432/husniyyah_luxe';

// Use a singleton pattern to avoid too many connections in development
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(connectionString);
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
