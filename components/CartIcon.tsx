'use client';

import React from 'react';
import { useCart } from './CartProvider';

export default function CartIcon() {
  const { totalItems, toggleCart } = useCart();

  return (
    <button 
      aria-label="Cart" 
      onClick={toggleCart}
      className="hover:text-brand-gold transition-colors border border-foreground/20 p-2 rounded-sm hover:border-brand-gold relative group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-gold text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-in zoom-in duration-300">
          {totalItems}
        </span>
      )}
    </button>
  );
}
