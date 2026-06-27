'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';

export default function CartSidebar() {
  const { items, isCartOpen, toggleCart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      ></div>

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-background h-full shadow-2xl flex flex-col border-l border-brand-gold/20 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-6 border-b border-foreground/10 flex items-center justify-between bg-foreground/5">
          <h2 className="text-xl font-bold tracking-widest text-foreground uppercase">Your Cart</h2>
          <button 
            onClick={toggleCart} 
            className="p-2 text-foreground/50 hover:text-brand-gold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-foreground/50 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg">Your cart is empty.</p>
              <button 
                onClick={toggleCart}
                className="mt-4 px-6 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-background transition-colors uppercase tracking-widest text-xs font-bold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 border border-foreground/10 rounded-xl bg-foreground/5 relative group">
                <div className="relative w-24 h-24 bg-background rounded-lg overflow-hidden border border-foreground/10 flex-shrink-0">
                  <Image 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    fill 
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex flex-col flex-1 py-1">
                  <h3 className="font-bold text-foreground line-clamp-1">{item.product.name}</h3>
                  <p className="text-brand-gold font-bold text-sm mt-1">
                    ₦{(item.product.price / 100).toFixed(2)}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-auto pt-2">
                    <div className="flex items-center border border-foreground/20 rounded-md bg-background">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 text-foreground hover:text-brand-gold transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 text-foreground hover:text-brand-gold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Remove button */}
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="absolute top-2 right-2 p-2 text-foreground/30 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-brand-gold/20 bg-background">
            <div className="flex justify-between items-center mb-6">
              <span className="text-foreground/70 uppercase tracking-widest text-sm font-bold">Subtotal</span>
              <span className="text-2xl font-bold text-foreground">₦{(totalPrice / 100).toFixed(2)}</span>
            </div>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={clearCart}
                className="block w-full text-center border border-foreground/20 text-foreground/70 py-3 font-bold uppercase tracking-widest text-xs hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                Clear Cart
              </button>
              <Link 
                href="/checkout"
                onClick={toggleCart}
                className="block w-full text-center bg-brand-green text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-background transition-colors"
              >
                Secure Checkout
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
