import fs from 'fs';
import path from 'path';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { products } from '../src/db/schema';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Setup database connection
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Abdlazeez1432001@localhost:5432/husniyyah_luxe';
const client = postgres(connectionString);
const db = drizzle(client);

const sourceDir = path.join(__dirname, '../../Husniyyah Luxe Design');
const targetDir = path.join(__dirname, '../public/products');

async function seed() {
  console.log('Starting seed process...');

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Read files from source directory
  const files = fs.readdirSync(sourceDir);
  
  // Filter for valid product images
  const imageFiles = files.filter(file => {
    const isImage = file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp');
    const isLogo = file.toLowerCase().includes('logo');
    const isScreenshot = file.toLowerCase().includes('screenshot');
    return isImage && !isLogo && !isScreenshot;
  });

  console.log(`Found ${imageFiles.length} product images.`);

  const insertedProducts = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const sourcePath = path.join(sourceDir, file);
    
    // Generate a clean filename for the web
    const ext = path.extname(file);
    const cleanFileName = `product-${i + 1}${ext}`;
    const targetPath = path.join(targetDir, cleanFileName);

    // Copy file to public/products
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to ${cleanFileName}`);

    // Insert into database
    const productName = `Handmade Luxury Item ${i + 1}`;
    const productDesc = `Beautiful handcrafted item with elegant details. Perfect for your collection.`;
    const price = Math.floor(Math.random() * 50000) + 10000; // Random price between 100.00 and 600.00 (in cents)

    try {
      const [newProduct] = await db.insert(products).values({
        name: productName,
        description: productDesc,
        price,
        imageUrl: `/products/${cleanFileName}`,
      }).returning();
      
      insertedProducts.push(newProduct);
      console.log(`Inserted: ${newProduct.name}`);
    } catch (error) {
      console.error(`Failed to insert ${productName}:`, error);
    }
  }

  console.log('Seed completed. Inserted', insertedProducts.length, 'products.');
  
  await client.end();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
