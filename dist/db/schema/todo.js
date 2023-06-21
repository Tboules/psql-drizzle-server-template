import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
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
});
export const todoInsertSchema = createInsertSchema(todo, {
    title: z.string().min(1),
    body: z.string().min(1),
});
export const todoSelectSchema = createSelectSchema(todo);
//# sourceMappingURL=todo.js.map