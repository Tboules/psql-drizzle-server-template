import { todo, todoInsertSchema } from "../../../db/schema/todo.js";
import { db } from "../../../loaders/drizzleLoader.js";
import { eq } from "drizzle-orm";
import tryCatch from "../../../utils/tryCatch.js";
export const putTodo = tryCatch(async (req, res) => {
    const todoToUpdate = req.body;
    const userId = req.user?.id ?? "";
    console.log(userId, todoToUpdate.authorId);
    if (todoToUpdate.authorId != userId) {
        throw new Error("That todo does not belong to you");
    }
    const newTodo = {
        ...todoToUpdate,
        createdAt: new Date(todoToUpdate.createdAt),
        updatedAt: new Date(Date.now()),
    };
    todoInsertSchema.parse(newTodo);
    const updatedTodo = await db
        .update(todo)
        .set(newTodo)
        .where(eq(todo.id, todoToUpdate.id))
        .returning();
    res.status(200).send(updatedTodo);
});
//# sourceMappingURL=put.js.map