import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from '../src/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || 'postgres://postgres:Abdlazeez1432001@localhost:5432/husniyyah_luxe';
const conn = postgres(connectionString, { prepare: false });
const db = drizzle(conn);

async function createAdmin() {
  const email = 'admin@husniyyah.com';
  const plainPassword = 'password123';

  console.log('Creating admin user...');
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(plainPassword, salt);

  try {
    await db.insert(users).values({
      name: 'Admin',
      email: email,
      passwordHash: passwordHash,
    });
    console.log(`Admin user created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${plainPassword}`);
  } catch (error: any) {
    if (error.code === '23505' || error.cause?.code === '23505') {
      console.log('Admin user already exists. Resetting password...');
      await db.update(users)
        .set({ passwordHash: passwordHash })
        .where(eq(users.email, email));
      console.log(`Password reset to: ${plainPassword}`);
    } else {
      console.error('Error creating admin user:', error);
    }
  }
  
  process.exit(0);
}

createAdmin();
