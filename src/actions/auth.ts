'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db';
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

  // Find user
  const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = userList[0];

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  // Check password
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return { error: 'Invalid email or password' };
  }

  // Create session
  await createSession(user.id);
  
  redirect('/admin');
}

export async function logout() {
  await deleteSession();
  redirect('/admin/login');
}
