import { ilike, or } from "drizzle-orm";
import { db } from "../../../loaders/drizzleLoader.js";
import { todo } from "../../../schema/index.js";
export const getTodos = async (req, res) => {
    try {
        const todos = await db.select().from(todo);
        res.status(200).send(todos);
    }
    catch (error) {
        res.status(400).send("Something went wrong");
    }
};
export const searchTodos = async (req, res) => {
    try {
        const { search } = req.params;
        const filteredTodos = await db
            .select()
            .from(todo)
            .where(or(ilike(todo.body, `%${search}%`), ilike(todo.title, `%${search}%`)));
        res.status(200).send(filteredTodos);
    }
    catch (error) {
        res.status(400).send("Something went wrong");
    }
};
//# sourceMappingURL=get.js.map