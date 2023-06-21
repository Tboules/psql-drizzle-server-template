import { eq } from "drizzle-orm";
import { db } from "../../../loaders/drizzleLoader.js";
import tryCatch from "../../../utils/tryCatch.js";
import { todo } from "../../../db/schema/todo.js";
export const deleteTodo = tryCatch(async (req, res) => {
    if (isNaN(Number(req.params.id))) {
        throw new Error("To delete a todo pass a valid number ID");
    }
    const deleted = await db
        .delete(todo)
        .where(eq(todo.id, Number(req.params.id)))
        .returning();
    if (deleted.length == 0) {
        throw new Error("A todo at that ID cannot be found");
    }
    res.status(200).send("deleted todo with id " + req.params.id);
});
//# sourceMappingURL=delete.js.map