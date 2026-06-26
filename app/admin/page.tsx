import { db } from '../../src/db';
import { products } from '../../src/db/schema';
import { sql } from 'drizzle-orm';
import Link from 'next/link';

export default async function AdminDashboard() {
  const result = await db.select({ count: sql<number>`count(*)` }).from(products);
  const totalProducts = result[0].count;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-background rounded-xl p-6 border border-foreground/10 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-foreground/60 mb-2 uppercase tracking-wider">Total Products</span>
          <span className="text-4xl font-bold text-brand-gold">{totalProducts}</span>
        </div>
      </div>

      <div className="bg-background rounded-xl p-8 border border-foreground/10 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="flex space-x-4">
          <Link href="/admin/products/new" className="bg-brand-gold text-background px-6 py-3 rounded-md font-medium hover:bg-brand-green hover:text-white transition-colors shadow-sm">
            + Add New Product
          </Link>
          <Link href="/admin/products" className="bg-foreground/5 text-foreground px-6 py-3 rounded-md font-medium border border-foreground/10 hover:border-brand-gold transition-colors">
            Manage Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
