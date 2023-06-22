import { InferModel, relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./user.js";

export const statusEnum = pgEnum("todo_status", [
  "created",
  "in-progress",
  "complete",
]);

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
  status: statusEnum("todo_status").notNull(),
  duration: timestamp("duration"),
  authorId: uuid("author_id")
    .references(() => user.id)
    .notNull(),
});

export type Todo = InferModel<typeof todo>;

export const todoInsertSchema = createInsertSchema(todo, {
  title: z.string().min(1),
  body: z.string().min(1),
  authorId: z.string(),
});
export const todoSelectSchema = createSelectSchema(todo);

export const todoRelations = relations(todo, ({ one }) => ({
  author: one(user, {
    fields: [todo.authorId],
    references: [user.id],
  }),
}));
