'use client';

import { useActionState } from 'react';
import { login } from '../../../src/actions/auth';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-foreground/20 rounded-md shadow-sm placeholder-foreground/40 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm bg-background text-foreground"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-foreground/20 rounded-md shadow-sm placeholder-foreground/40 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm bg-background text-foreground"
          />
        </div>
      </div>

      {state?.error && (
        <div className="text-red-500 text-sm mt-2 font-medium bg-red-500/10 p-3 rounded-md">
          {state.error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-brand-gold hover:bg-brand-green hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors disabled:opacity-50"
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
