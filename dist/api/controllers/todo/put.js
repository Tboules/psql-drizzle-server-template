import { todo, todoInsertSchema } from "../../../db/schema/todo.js";
import { db } from "../../../loaders/drizzleLoader.js";
import { eq } from "drizzle-orm";
import tryCatch from "../../../utils/tryCatch.js";
export const putTodo = tryCatch(async (req, res) => {
    const data = req.body;
    const newTodo = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(Date.now()),
    };
    todoInsertSchema.parse(newTodo);
    const updatedTodo = await db
        .update(todo)
        .set(newTodo)
        .where(eq(todo.id, data.id))
        .returning();
    res.status(200).send(updatedTodo);
});
//# sourceMappingURL=put.js.map