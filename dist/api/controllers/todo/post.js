import { todo, todoInsertSchema } from "./../../../schema/index.js";
import { db } from "../../../loaders/drizzleLoader.js";
export const postTodo = async (req, res) => {
    try {
        const data = req.body;
        const newTodo = {
            ...data,
            createdAt: new Date(Date.now()),
            status: "created",
        };
        todoInsertSchema.parse(newTodo);
        const insertedTodo = await db.insert(todo).values(newTodo).returning();
        res.status(200).send(insertedTodo);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
//# sourceMappingURL=post.js.map