import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../../src/db';
import { products } from '../../../src/db/schema';
import { desc, ilike, eq, and } from 'drizzle-orm';
import AddToCartButton from '../../../components/AddToCartButton';
import { ProductFilter } from '../../../components/ProductFilter';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string }> }) {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.q || '';
  const categoryFilter = resolvedParams?.category || '';

  let allProducts: any[] = [];
  let allCategories: string[] = [];
  
  try {
    const conditions = [];
    if (search) {
      conditions.push(ilike(products.name, `%${search}%`));
    }
    if (categoryFilter && categoryFilter !== 'All') {
      conditions.push(eq(products.category, categoryFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    allProducts = await db.select().from(products).where(whereClause).orderBy(desc(products.id));
    
    const catResult = await db.selectDistinct({ category: products.category }).from(products);
    allCategories = catResult.map(r => r.category).filter(Boolean) as string[];
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

      <ProductFilter categories={allCategories} />

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
                {product.category && product.category !== 'Uncategorized' && (
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
                <h3 className="text-foreground font-bold text-lg mb-2 text-center line-clamp-1 transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between w-full mt-auto pt-4">
                  <p className="text-brand-gold font-bold text-lg tracking-wider">₦{(product.price / 100).toFixed(2)}</p>
                  <AddToCartButton product={product} compact />
                </div>
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
