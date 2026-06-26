import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../src/db';
import { products } from '../../src/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let allProducts: any[] = [];
  try {
    allProducts = await db.select().from(products).orderBy(desc(products.id));
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">All Products</h1>
        <div className="w-16 h-1 bg-brand-gold mb-6"></div>
        <p className="text-foreground/70 text-lg max-w-2xl">
          Browse our complete collection of handcrafted luxury items. Each piece is made with unparalleled attention to detail.
        </p>
      </div>

      {allProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {allProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-background rounded-2xl overflow-hidden border border-foreground/10 hover:border-brand-gold/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] shadow-sm">
              <div className="relative aspect-square w-full bg-foreground/5 flex items-center justify-center p-8 overflow-hidden transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent z-10 opacity-60"></div>
                <div className="relative w-full h-full z-0 transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-6 flex flex-col items-center flex-1 bg-background z-20">
                <h3 className="text-foreground font-bold text-lg mb-2 text-center line-clamp-1 transition-colors">{product.name}</h3>
                <p className="text-brand-gold font-bold text-lg tracking-wider mt-auto">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-foreground/5 rounded-2xl border border-foreground/10">
          <p className="text-foreground/60 text-lg">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
