import { db } from '../../../../../../src/db';
import { products } from '../../../../../../src/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ProductForm } from '../../ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  
  if (isNaN(productId)) {
    notFound();
  }

  const productList = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  const product = productList[0];

  if (!product) {
    notFound();
  }

  const result = await db.selectDistinct({ category: products.category }).from(products);
  const existingCategories = result.map(r => r.category).filter(Boolean) as string[];

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">Edit Product</h2>
      <ProductForm initialData={product} existingCategories={existingCategories} />
    </div>
  );
}
