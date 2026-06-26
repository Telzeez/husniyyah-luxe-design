import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { products } from '../src/db/schema';
import dotenv from 'dotenv';
import { eq } from 'drizzle-orm';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Abdlazeez1432001@localhost:5432/husniyyah_luxe';
const client = postgres(connectionString);
const db = drizzle(client);

const categories = [
  "Leather Keyholder",
  "Vintage Pen Pouch",
  "Handcrafted Earrings",
  "Luxury Necklace",
  "Beaded Bracelet",
  "Artisan Wallet",
  "Woven Bag",
  "Embroidered Table Mat",
  "Gold-plated Brooch",
  "Decorative Ornament"
];

async function updateProducts() {
  console.log('Updating products with representative categories...');
  
  // Fetch all products
  const allProducts = await db.select().from(products);
  let count = 0;

  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i];
    // Assign a category deterministically based on ID
    const category = categories[product.id % categories.length];
    
    // Create a beautiful name
    const luxuryName = `${category} - Edition ${product.id}`;

    try {
      await db.update(products)
        .set({ name: luxuryName })
        .where(eq(products.id, product.id));
      
      count++;
    } catch (error) {
      console.error(`Failed to update ${product.id}:`, error);
    }
  }

  console.log(`Successfully updated ${count} products with representative names!`);
  await client.end();
}

updateProducts().catch(err => {
  console.error('Update failed:', err);
  process.exit(1);
});
