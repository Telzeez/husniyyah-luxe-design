import { ProductForm } from '../ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">Add New Product</h2>
      <ProductForm />
    </div>
  );
}
