'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function ProductFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams?.get('q') || '');
  const currentCategory = searchParams?.get('category') || 'All';

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() || '');
      if (search) {
        params.set('q', search);
      } else {
        params.delete('q');
      }
      router.push(`/product?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, router, searchParams]);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/product?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-foreground/5 p-4 rounded-xl border border-foreground/10">
      {/* Search Bar */}
      <div className="w-full md:w-1/3 relative">
        <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-background border border-foreground/10 rounded-lg focus:outline-none focus:border-brand-gold text-foreground transition-colors"
        />
      </div>

      {/* Category Pills */}
      <div className="w-full md:w-2/3 flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide">
        <button
          onClick={() => setCategory('All')}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === 'All' 
              ? 'bg-brand-gold text-background' 
              : 'bg-background border border-foreground/10 text-foreground/70 hover:border-brand-gold hover:text-brand-gold'
          }`}
        >
          All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentCategory === cat 
                ? 'bg-brand-gold text-background' 
                : 'bg-background border border-foreground/10 text-foreground/70 hover:border-brand-gold hover:text-brand-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
