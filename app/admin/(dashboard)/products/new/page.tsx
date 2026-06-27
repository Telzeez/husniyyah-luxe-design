import { ProductForm } from '../ProductForm';
import { db } from '../../../../../src/db';
import { products } from '../../../../../src/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const result = await db.selectDistinct({ category: products.category }).from(products);
  const existingCategories = result.map(r => r.category).filter(Boolean) as string[];

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">Add New Product</h2>
      <ProductForm existingCategories={existingCategories} />
    </div>
  );
}
