import { db } from '../../../src/db';
import { products } from '../../../src/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const allProducts = await db.select().from(products).orderBy(desc(products.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Manage Products</h2>
        <Link href="/admin/products/new" className="bg-brand-gold text-background px-4 py-2 rounded-md font-medium text-sm hover:bg-brand-green hover:text-white transition-colors shadow-sm">
          + Add New
        </Link>
      </div>

      <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground/80">
            <thead className="bg-foreground/5 text-xs uppercase font-semibold text-foreground border-b border-foreground/10">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {allProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-foreground/50">
                    No products found.
                  </td>
                </tr>
              ) : (
                allProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-foreground/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-foreground/5 border border-foreground/10">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">{product.name}</td>
                    <td className="px-6 py-4">₦{(product.price / 100).toFixed(2)}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-brand-gold hover:text-brand-green transition-colors font-medium">
                        Edit
                      </Link>
                      {/* Delete is tricky in a pure link, normally it should be a form button. For now, we will handle this in Edit page or via a client component. Let's make a small client component for delete. */}
                      <DeleteButton id={product.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Inline client component for deleting (usually should be in separate file)
import { DeleteButton } from './DeleteButton';
