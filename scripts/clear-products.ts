import { db } from '../src/db';
import { products } from '../src/db/schema';

async function clearProducts() {
  console.log('Clearing all products from the database...');
  try {
    await db.delete(products);
    console.log('Successfully cleared all products!');
  } catch (error) {
    console.error('Error clearing products:', error);
  }
  process.exit(0);
}

clearProducts();
