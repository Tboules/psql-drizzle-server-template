import { ilike, or } from "drizzle-orm";
import { db } from "../../../loaders/drizzleLoader.js";
import { todo } from "../../../db/schema/todo.js";
import tryCatch from "../../../utils/tryCatch.js";
export const getTodos = tryCatch(async (req, res) => {
    const todos = await db.select().from(todo);
    req.user;
    res.status(200).send(todos);
});
export const searchTodos = tryCatch(async (req, res) => {
    const { search } = req.params;
    const filteredTodos = await db
        .select()
        .from(todo)
        .where(or(ilike(todo.body, `%${search}%`), ilike(todo.title, `%${search}%`)));
    res.status(200).send(filteredTodos);
});
//# sourceMappingURL=get.js.map