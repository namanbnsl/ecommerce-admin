import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import 'dotenv/config';
import postgres from 'postgres';

const doMigrate = async () => {
  try {
    const connectionString = process.env.DATABASE_URL;

    const sql = postgres(connectionString, { max: 1 });
    const db = drizzle(sql);

    await migrate(db, { migrationsFolder: 'drizzle' });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
};

doMigrate();
