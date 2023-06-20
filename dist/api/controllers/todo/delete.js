import { todo } from "./../../../schema/index.js";
import { db } from "../../../loaders/drizzleLoader.js";
import { eq } from "drizzle-orm";
export const deleteTodo = async (req, res) => {
    try {
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
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};
//# sourceMappingURL=delete.js.map