'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '../../../components/CartProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // Redirect if cart is empty and not successfully checked out
  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      router.push('/product');
    }
  }, [items, isSuccess, router]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-foreground/5 p-8 rounded-2xl border border-brand-gold/30 text-center animate-in zoom-in duration-500 shadow-2xl">
          <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-green">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Thank you for your purchase. We have received your order and will begin processing it immediately. You will receive an email confirmation shortly.
          </p>
          <Link 
            href="/"
            className="inline-block bg-brand-gold text-background px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-brand-green hover:text-white transition-colors w-full"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) return null; // Avoid flicker before redirect

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-widest">Secure Checkout</h1>
        <div className="w-16 h-1 bg-brand-gold"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleCheckout} className="space-y-12">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wider border-b border-foreground/10 pb-2">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-md focus:border-brand-gold focus:outline-none transition-colors" />
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wider border-b border-foreground/10 pb-2">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">First Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-md focus:border-brand-gold focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Last Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-md focus:border-brand-gold focus:outline-none transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Address</label>
                  <input type="text" required className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-md focus:border-brand-gold focus:outline-none transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground/80 mb-2">City</label>
                  <input type="text" required className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-md focus:border-brand-gold focus:outline-none transition-colors" />
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wider border-b border-foreground/10 pb-2">Payment <span className="text-xs text-foreground/50 ml-2 font-normal">(Dummy Mode)</span></h2>
              <div className="p-6 border border-brand-gold/30 bg-brand-gold/5 rounded-lg flex items-start space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-gold mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Testing Environment</h3>
                  <p className="text-sm text-foreground/70">No real payment will be processed. Just click the button below to complete your dummy order.</p>
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-brand-green text-white py-5 font-bold uppercase tracking-widest text-lg hover:bg-brand-gold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Pay ₦{(totalPrice / 100).toFixed(2)}</span>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-foreground/5 p-8 rounded-xl border border-foreground/10 sticky top-32">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wider border-b border-foreground/10 pb-4">Order Summary</h2>
            
            <div className="space-y-6 mb-8">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-brand-gold bg-brand-gold/10 px-2 py-1 rounded">{item.quantity}x</span>
                    <span className="text-foreground line-clamp-1 max-w-[150px]">{item.product.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">₦{((item.product.price * item.quantity) / 100).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-foreground/10 pt-6 space-y-3">
              <div className="flex justify-between text-sm text-foreground/70">
                <span>Subtotal</span>
                <span>₦{(totalPrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-foreground/70">
                <span>Shipping</span>
                <span className="text-brand-green font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-foreground pt-4 border-t border-foreground/10 mt-4">
                <span>Total</span>
                <span className="text-brand-gold">₦{(totalPrice / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
