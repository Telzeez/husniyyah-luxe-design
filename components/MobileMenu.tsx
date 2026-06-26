'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        className="p-2 text-foreground/80 hover:text-brand-gold transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-brand-gold/20 shadow-xl flex flex-col p-6 space-y-4 text-sm font-semibold tracking-widest text-foreground z-[100] animate-in slide-in-from-top-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors uppercase py-2">Home</Link>
          <Link href="/product" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors uppercase py-2">Shop</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors uppercase py-2">Blog</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors uppercase py-2">Pages</Link>
          <Link href="/client" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors uppercase py-2">Client Portal</Link>
        </div>
      )}
    </div>
  );
}
