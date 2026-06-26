import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from '../../src/actions/auth';
import ThemeToggle from '../../components/ThemeToggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-64 bg-foreground/5 border-r border-brand-gold/20 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-brand-gold/20">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brand-gold">
              <Image src="/logo.png" alt="Husniyyah Logo" fill className="object-cover" />
            </div>
            <span className="font-bold tracking-widest text-sm text-foreground group-hover:text-brand-gold transition-colors">
              HUSNIYYAH
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <p className="px-2 text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4">Dashboard</p>
          <Link href="/admin" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-brand-gold/10 hover:text-brand-gold transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            Overview
          </Link>
          <Link href="/admin/products" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-brand-gold/10 hover:text-brand-gold transition-colors text-brand-gold bg-brand-gold/10">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-background border-b border-brand-gold/20 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold tracking-wider text-foreground">Admin Portal</h1>
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <form action={logout}>
              <button type="submit" className="text-sm font-medium text-foreground/70 hover:text-red-500 transition-colors">
                Logout
              </button>
            </form>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background/50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
