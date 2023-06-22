import { and, eq } from "drizzle-orm";
import { RequestHandler } from "express";

import { db } from "../../../loaders/drizzleLoader.js";
import tryCatch from "../../../utils/tryCatch.js";
import { todo } from "../../../db/schema/todo.js";
import { RequestWithUser } from "../../../utils/types.js";

export const deleteTodo: RequestHandler = tryCatch(
  async (req: RequestWithUser, res) => {
    if (isNaN(Number(req.params.id))) {
      throw new Error("To delete a todo pass a valid number ID");
    }

    const deleted = await db
      .delete(todo)
      .where(
        and(
          eq(todo.authorId, req.user?.id ?? ""),
          eq(todo.id, Number(req.params.id))
        )
      )
      .returning();

    if (deleted.length == 0) {
      throw new Error("A todo at that ID cannot be found from your user");
    }

    res.status(200).send("deleted todo with id " + req.params.id);
  }
);
