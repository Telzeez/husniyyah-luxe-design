'use client';

import React from 'react';
import { useFavorites } from './FavoriteProvider';

interface FavoriteButtonProps {
  productId: number;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(productId);

  return (
    <button 
      aria-label="Toggle Favorite"
      onClick={() => toggleFavorite(productId)}
      className={`w-14 h-14 border rounded-full flex items-center justify-center transition-colors ${
        favorited 
          ? 'bg-brand-gold border-brand-gold text-background' 
          : 'border-foreground/20 text-foreground/60 hover:text-brand-gold hover:border-brand-gold'
      }`}
    >
      <svg 
        className="w-6 h-6" 
        fill={favorited ? 'currentColor' : 'none'} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
}
