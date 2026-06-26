import { db } from '../src/db';
import { users } from '../src/db/schema';
import bcrypt from 'bcryptjs';

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
      console.log('Admin user already exists.');
    } else {
      console.error('Error creating admin user:', error);
    }
  }
  
  process.exit(0);
}

createAdmin();
