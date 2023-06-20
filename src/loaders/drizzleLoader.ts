import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export const dbClient = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "drizzle_todo",
});

await dbClient.connect();
export const db = drizzle(dbClient, { logger: true });
