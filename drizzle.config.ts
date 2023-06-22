import type { Config } from "drizzle-kit";

export default {
  schema: "./dist/db/schema/*.js",
  out: "./drizzle",
} satisfies Config;
