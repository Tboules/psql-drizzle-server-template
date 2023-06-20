import { createInsertSchema } from "drizzle-zod";
import { InferModel } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const user = pgTable(
  "user",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").notNull(),
    lastSession: timestamp("last_session"),
  },
  (userTable) => {
    return {
      usernameIndex: uniqueIndex("username_index").on(userTable.username),
    };
  }
);

export type User = InferModel<typeof user>;

export const userInsertSchema = createInsertSchema(user, {
  createdAt: z.date().optional(),
});
