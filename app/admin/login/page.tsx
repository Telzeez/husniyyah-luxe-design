import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import LoginForm from './LoginForm';
import { logout } from '../../../src/actions/auth';
import { decrypt } from '../../../src/lib/session';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  let isLoggedIn = false;
  
  if (sessionCookie) {
    const payload = await decrypt(sessionCookie);
    isLoggedIn = !!payload;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold">
            <Image src="/logo.png" alt="Husniyyah Logo" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-foreground/60">
          {isLoggedIn ? 'You are currently signed in.' : 'Sign in to manage your products and orders'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md w-full">
        <div className="bg-foreground/5 py-8 px-4 sm:px-10 shadow sm:rounded-lg border border-foreground/10">
          {isLoggedIn ? (
            <div className="flex flex-col space-y-4">
              <Link 
                href="/admin" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-brand-gold hover:bg-brand-green hover:text-white transition-colors text-center"
              >
                Go to Dashboard
              </Link>
              <form action={logout}>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-2 px-4 border border-foreground/20 rounded-md shadow-sm text-sm font-medium text-foreground hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </div>
  );
}
