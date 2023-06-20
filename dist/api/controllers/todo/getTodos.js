import { like, or } from "drizzle-orm";
import { db } from "../../../loaders/drizzleLoader.js";
import { todo } from "../../../schema/index.js";
export const getTodos = async (req, res) => {
    try {
        const todos = await db.select().from(todo);
        res.status(200).send(todos);
    }
    catch (error) {
        res.send(400).send("Something went wrong");
    }
};
export const searchTodos = async (req, res) => {
    try {
        const { search } = req.params;
        const filteredTodos = await db
            .select()
            .from(todo)
            .where(or(like(todo.body, `%${search}%`), like(todo.title, `%${search}%`), like(todo.status, search)));
        // const filteredTodos = todos.filter((todo) => {
        //   return (
        //     todo.body?.includes(search) ||
        //     todo.title.includes(search) ||
        //     todo.status == search
        //   );
        // });
        res.status(200).send(filteredTodos);
    }
    catch (error) {
        res.send(400).send("Something went wrong");
    }
};
//# sourceMappingURL=getTodos.js.map