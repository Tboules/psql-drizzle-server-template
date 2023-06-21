import { todo, todoInsertSchema } from "../../../db/schema/todo.js";
import { db } from "../../../loaders/drizzleLoader.js";
import tryCatch from "../../../utils/tryCatch.js";
export const postTodo = tryCatch(async (req, res) => {
    const data = req.body;
    const newTodo = {
        ...data,
        createdAt: new Date(Date.now()),
        status: "created",
    };
    todoInsertSchema.parse(newTodo);
    const insertedTodo = await db.insert(todo).values(newTodo).returning();
    res.status(200).send(insertedTodo);
});
//# sourceMappingURL=post.js.map