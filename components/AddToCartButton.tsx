'use client';

import React from 'react';
import { useCart, Product } from './CartProvider';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="flex-1 bg-[#145032] text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#D2B43C] hover:text-white dark:hover:text-[#1A1D24] transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
}
