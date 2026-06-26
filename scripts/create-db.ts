import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectionString = 'postgres://postgres:Abdlazeez1432001@localhost:5432/postgres'; // Connect to default DB

async function createDatabase() {
  const sql = postgres(connectionString);
  try {
    console.log('Connecting to postgres to create husniyyah_luxe database...');
    // check if db exists
    const result = await sql`SELECT 1 FROM pg_database WHERE datname = 'husniyyah_luxe'`;
    if (result.length === 0) {
      await sql`CREATE DATABASE husniyyah_luxe`;
      console.log('Database husniyyah_luxe created successfully.');
    } else {
      console.log('Database husniyyah_luxe already exists.');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await sql.end();
  }
}

createDatabase();
