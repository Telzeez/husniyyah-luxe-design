import { db } from '../../../../../src/db';
import { products } from '../../../../../src/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ProductForm } from '../../ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);
  
  if (isNaN(productId)) {
    notFound();
  }

  const productList = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  const product = productList[0];

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">Edit Product</h2>
      <ProductForm initialData={product} />
    </div>
  );
}
