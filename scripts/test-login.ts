import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db, connectionString } from '../src/db';
import { users } from '../src/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function testLogin() {
  const email = 'admin@husniyyah.com';
  const password = 'password123';

  console.log(`Testing login for ${email}...`);
  console.log(`Local DB URL: ${connectionString.replace(/:[^:@]*@/, ':***@')}`);

  const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = userList[0];

  if (!user) {
    console.error('USER NOT FOUND IN DATABASE!');
    process.exit(1);
  }

  console.log(`User found: ID ${user.id}, Name: ${user.name}`);
  console.log(`Password Hash in DB: ${user.passwordHash}`);

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (isValid) {
    console.log('PASSWORD MATCHES! Login is valid locally.');
  } else {
    console.error('PASSWORD DOES NOT MATCH!');
  }
  process.exit(0);
}

testLogin();
