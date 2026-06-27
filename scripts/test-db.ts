import { sql } from 'drizzle-orm';
import { db } from '../src/db';

async function main() {
  try {
    const res = await db.execute(sql`SELECT column_name FROM information_schema.columns WHERE table_name='products';`);
    console.log(res);
  } catch (err) {
    console.error('Error:', err);
  }
  process.exit(0);
}

main();
