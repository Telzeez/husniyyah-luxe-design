import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../../src/db';
import { products } from '../../../src/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  
  if (isNaN(productId)) {
    notFound();
  }

  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1A1D24] transition-colors">
      <div className="max-w-7xl mx-auto w-full px-8 py-16 flex-grow">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400 transition-colors">
          <Link href="/" className="hover:text-[#D2B43C] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/product" className="hover:text-[#D2B43C] transition-colors">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-[#145032] dark:text-white transition-colors">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="relative aspect-square w-full bg-gray-50 dark:bg-[#121419] rounded-2xl flex items-center justify-center p-8 border border-gray-200 dark:border-white/5 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 dark:from-[#121419] via-transparent to-transparent z-10 opacity-60 transition-colors"></div>
              <div className="relative w-full h-full z-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">{product.name}</h1>
            <div className="w-16 h-1 bg-[#D2B43C] mb-8"></div>
            
            <p className="text-3xl font-light text-gray-900 dark:text-white mb-8 transition-colors">
              ₦{(product.price / 100).toFixed(2)}
            </p>
            
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400 mb-10 transition-colors">
              <p>
                {product.description}
              </p>
              <ul className="mt-4 space-y-2">
                <li><span className="text-[#D2B43C] mr-2">✓</span> Premium quality materials</li>
                <li><span className="text-[#D2B43C] mr-2">✓</span> Exclusive design</li>
                <li><span className="text-[#D2B43C] mr-2">✓</span> Handcrafted with precision</li>
              </ul>
            </div>

            <div className="flex items-center space-x-6 mt-auto">
              <button className="flex-1 bg-[#145032] text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#D2B43C] hover:text-white dark:hover:text-[#1A1D24] transition-colors duration-300">
                Add to Cart
              </button>
              <button aria-label="Add to Wishlist" className="w-14 h-14 border border-gray-300 dark:border-white/20 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#D2B43C] hover:border-[#D2B43C] transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
