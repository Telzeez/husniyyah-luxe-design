import fs from 'fs';
import path from 'path';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { products } from '../src/db/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Abdlazeez1432001@localhost:5432/husniyyah_luxe';
const client = postgres(connectionString);
const db = drizzle(client);

async function updateProducts() {
  const jsonPath = path.join(__dirname, 'classifications.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error('classifications.json not found! Run the python script first.');
    process.exit(1);
  }

  console.log('Reading classifications...');
  const classifications = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let count = 0;

  for (const [filename, categoryName] of Object.entries(classifications)) {
    // The images were saved in the DB as `/products/product-1.jpg`
    // Wait, the python script classified `product-1.jpg`. 
    // We need to match it to the DB `imageUrl`.
    
    const dbImageUrl = `/products/${filename}`;
    
    // Generate a beautiful product name based on the category
    // E.g., if category is "Bag", we can make it "Luxury Handmade Bag"
    const luxuryName = `Luxury Handmade ${categoryName}`;

    try {
      await db.update(products)
        .set({ name: luxuryName })
        .where(eq(products.imageUrl, dbImageUrl));
      
      console.log(`Updated ${dbImageUrl} -> ${luxuryName}`);
      count++;
    } catch (error) {
      console.error(`Failed to update ${filename}:`, error);
    }
  }

  console.log(`Successfully updated ${count} products!`);
  await client.end();
}

updateProducts().catch(err => {
  console.error('Update failed:', err);
  process.exit(1);
});
