'use server';

import { eq } from 'drizzle-orm';
import { db, connectionString } from '../db';
import { users } from '../db/schema';
import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please enter both email and password' };
  }

  let user;
  try {
    // Find user
    const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
    user = userList[0];
  } catch (err: any) {
    return { error: 'DB Connection Error: ' + err.message };
  }

  if (!user) {
    const maskedDbUrl = connectionString.replace(/:[^:@]*@/, ':***@');
    return { error: `User not found in DB. Searched for: '${email}'. DB URL: ${maskedDbUrl}` };
  }

  // Check password
  let isValid = false;
  try {
    isValid = await bcrypt.compare(password, user.passwordHash);
  } catch (err: any) {
    return { error: 'Bcrypt Error: ' + err.message };
  }

  if (!isValid) {
    return { error: 'Invalid email or password (password hash mismatch)' };
  }

  // Create session
  await createSession(user.id);
  
  redirect('/admin');
}

export async function logout() {
  await deleteSession();
  redirect('/admin/login');
}
