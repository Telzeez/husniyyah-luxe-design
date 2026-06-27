import { sql } from 'drizzle-orm';
import { db } from '../src/db';

async function main() {
  try {
    await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category varchar(255) DEFAULT 'Uncategorized';`);
    console.log('Successfully added category column.');
  } catch (err) {
    console.error('Error:', err);
  }
  process.exit(0);
}

main();
