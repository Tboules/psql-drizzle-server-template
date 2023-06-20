import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { dbClient } from "../loaders/drizzleLoader.js";

const db = drizzle(dbClient);

await migrate(db, { migrationsFolder: "./drizzle" });
console.log("migration done");
