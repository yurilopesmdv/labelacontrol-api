import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool: pg.Pool | undefined;

function initialize() {
  const connectionString = process.env.DATABASE_URL;
  pool = new pg.Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    }
  });
}

export function getPool(): pg.Pool {
  if (!pool) {
    initialize();
  }
  return pool as pg.Pool;
}