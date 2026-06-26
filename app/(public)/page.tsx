import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../src/db';
import { products } from '../../src/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let trendingProducts: any[] = [];
  try {
    // Fetch latest products from the database
    trendingProducts = await db.select().from(products).orderBy(desc(products.id)).limit(12);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto w-full px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
          
          {/* Left Content */}
          <div className="md:w-1/2 flex flex-col items-start text-left mb-16 md:mb-0">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-brand-gold mr-4"></span>
              Premium Handmade
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight mb-8 transition-colors">
              Husniyyah <br />
              <span className="text-brand-green drop-shadow-md brightness-150">Luxe Design</span>
            </h1>
            <p className="text-foreground/70 max-w-md mb-10 text-lg leading-relaxed transition-colors">
              Discover our exclusive collection of meticulously crafted handmade items. Elevate your lifestyle with unparalleled luxury and attention to detail.
            </p>
            <div className="flex space-x-6">
              <Link href="/product" className="bg-brand-gold text-background px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-brand-green hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(210,180,60,0.3)]">
                Explore Collection
              </Link>
              <Link href="#" className="border border-brand-green text-brand-green px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-brand-green hover:text-background transition-colors duration-300">
                Our Story
              </Link>
            </div>
          </div>

          {/* Right Imagery (Abstract/Hero Image) */}
          <div className="md:w-1/2 relative flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-brand-green/10 flex items-center justify-center p-8 border border-brand-green/30 backdrop-blur-sm transition-colors">
               <div className="absolute inset-0 rounded-full border border-brand-gold/20 scale-110 animate-pulse"></div>
               <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                  <Image 
                    src="/heroimage.jpg" 
                    alt="Featured Handmade Collection" 
                    fill 
                    className="object-cover"
                  />
               </div>
               {/* Floating elements */}
               <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-brand-gold/20 blur-xl"></div>
               <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-brand-green/20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-foreground/5 py-24 border-y border-foreground/10 transition-colors">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-foreground mb-6 transition-colors">The Handmade Benefit</h2>
            <div className="w-16 h-1 bg-brand-gold mb-8"></div>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8 transition-colors">
              Every item is crafted with passion, precision, and the finest materials. We believe in creating pieces that not only look stunning but also stand the test of time, bringing a touch of luxury to your everyday life.
            </p>
            <Link href="/product" className="inline-block bg-brand-green text-white px-8 py-3 font-semibold tracking-wider text-sm uppercase hover:bg-brand-gold hover:text-background transition-colors duration-300">
              Learn More
            </Link>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-6">
            {trendingProducts.slice(1, 3).map((product, idx) => (
              <div key={idx} className="bg-background rounded-lg p-6 flex flex-col items-center border border-foreground/10 hover:border-brand-gold/30 transition-colors shadow-sm">
                <div className="relative w-full aspect-square mb-4">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-foreground font-medium text-center line-clamp-1 transition-colors">{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Grid Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto w-full">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4 transition-colors">Trending Now</h2>
            <p className="text-foreground/70 max-w-xl transition-colors">
              Explore our most sought-after pieces, curated for those who appreciate the true art of luxury.
            </p>
          </div>
          <Link href="/product" className="mt-8 md:mt-0 text-brand-gold font-semibold uppercase tracking-wider hover:text-brand-green transition-colors flex items-center">
            View All <span className="ml-2">&rarr;</span>
          </Link>
        </div>

        {trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {trendingProducts.slice(3, 9).map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-background rounded-2xl overflow-hidden border border-foreground/10 hover:border-brand-gold/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] shadow-sm">
                <div className="relative aspect-[4/3] w-full bg-foreground/5 flex items-center justify-center p-8 overflow-hidden transition-colors">
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
                  {/* Hover Tag */}
                  <div className="absolute top-4 right-4 z-20 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">NEW</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                  <div className="w-10 h-[2px] bg-brand-green mb-4"></div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xl text-foreground font-light transition-colors">₦{(product.price / 100).toFixed(2)}</p>
                    <span className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                      <svg className="w-4 h-4 text-foreground group-hover:text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground/50 bg-background rounded-2xl border border-foreground/10 transition-colors">
            <p>No products found. Please run the seed script.</p>
          </div>
        )}
      </section>
    </div>
  );
}
