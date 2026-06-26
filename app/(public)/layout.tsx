import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '../../components/ThemeToggle';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-brand-gold/20 py-6 px-8 sticky top-0 bg-background/90 backdrop-blur-md z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-gold transition-colors">
                <Image src="/logo.png" alt="Husniyyah Logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold tracking-[0.2em] text-foreground">
                HUSNIYYAH
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-10 text-xs font-semibold tracking-widest text-foreground/70">
            <Link href="/" className="hover:text-brand-gold transition-colors uppercase">HOME</Link>
            <Link href="/product" className="hover:text-brand-gold transition-colors uppercase">SHOP</Link>
            <Link href="#" className="hover:text-brand-gold transition-colors uppercase">BLOG</Link>
            <Link href="#" className="hover:text-brand-gold transition-colors uppercase">PAGES</Link>
            <Link href="/client" className="hover:text-brand-gold transition-colors uppercase">CLIENT PORTAL</Link>
          </nav>

          {/* Icons (Theme, User, Cart) */}
          <div className="flex items-center space-x-4 text-foreground/80">
            <ThemeToggle />
            
            <Link href="/client" aria-label="Account" className="hover:text-brand-gold transition-colors border border-foreground/20 p-2 rounded-sm hover:border-brand-gold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <button aria-label="Cart" className="hover:text-brand-gold transition-colors border border-foreground/20 p-2 rounded-sm hover:border-brand-gold relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-brand-gold text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-background text-foreground/60 py-16 mt-20 border-t border-brand-gold/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
             <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                   <Image src="/logo.png" alt="Husniyyah Logo" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold tracking-widest text-foreground">HUSNIYYAH</h3>
             </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Experience the pinnacle of handmade luxury. Our curated collections are designed with unparalleled elegance and the finest craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-gold/50 flex items-center justify-center hover:bg-brand-gold hover:text-background transition-colors text-foreground">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-gold/50 flex items-center justify-center hover:bg-brand-gold hover:text-background transition-colors text-foreground">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-foreground font-bold tracking-widest mb-6 text-sm uppercase">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Accessories</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Home Decor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-bold tracking-widest mb-6 text-sm uppercase">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-brand-gold/10 text-xs flex flex-col md:flex-row items-center justify-between">
          <p>&copy; {new Date().getFullYear()} Husniyyah Luxe Design. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
