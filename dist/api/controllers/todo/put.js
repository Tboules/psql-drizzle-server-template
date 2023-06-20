import { todo, todoInsertSchema } from "./../../../schema/index.js";
import { db } from "../../../loaders/drizzleLoader.js";
import { eq } from "drizzle-orm";
export const putTodo = async (req, res) => {
    try {
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
    }
    catch (error) {
        res.status(400).send(error);
    }
};
//# sourceMappingURL=put.js.map