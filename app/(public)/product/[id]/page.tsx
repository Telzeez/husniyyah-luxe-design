import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../../../src/db';
import { products } from '../../../../src/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../../../components/AddToCartButton';
import ProductGallery from '../../../../components/ProductGallery';
import FavoriteButton from '../../../../components/FavoriteButton';

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
          <ProductGallery 
            productName={product.name} 
            initialImageUrl={product.imageUrl} 
            images={product.images || []} 
          />

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
              <AddToCartButton product={product} />
              <FavoriteButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
