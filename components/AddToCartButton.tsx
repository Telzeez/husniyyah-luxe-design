'use client';

import React from 'react';
import { useCart, Product } from './CartProvider';

interface AddToCartButtonProps {
  product: Product;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  if (compact) {
    return (
      <button 
        onClick={handleClick}
        className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-brand-gold hover:text-background transition-colors text-foreground"
        aria-label="Add to cart"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className="flex-1 bg-brand-green text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-brand-gold hover:text-background transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
}
