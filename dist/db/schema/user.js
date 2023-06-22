import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex, uuid, } from "drizzle-orm/pg-core";
import { z } from "zod";
import { todo } from "./todo.js";
export const user = pgTable("user", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").notNull(),
    lastSession: timestamp("last_session"),
}, (userTable) => {
    return {
        usernameIndex: uniqueIndex("username_index").on(userTable.username),
    };
});
export const userInsertSchema = createInsertSchema(user, {
    createdAt: z.date().optional(),
});
export const userRelations = relations(user, ({ many }) => ({
    todos: many(todo),
}));
//# sourceMappingURL=user.js.map