import { sql } from 'drizzle-orm';
import { db } from '../src/db';

async function main() {
  try {
    const res = await db.execute(sql`select distinct "category" from "products"`);
    console.log(res);
  } catch (err) {
    console.error('Error:', err);
  }
  process.exit(0);
}

main();
