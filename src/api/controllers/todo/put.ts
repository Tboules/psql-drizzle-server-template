import { todo, todoInsertSchema, Todo } from "../../../db/schema/todo.js";
import { RequestHandler } from "express";
import { db } from "../../../loaders/drizzleLoader.js";
import { and, eq } from "drizzle-orm";
import tryCatch from "../../../utils/tryCatch.js";
import { RequestWithUser } from "../../../utils/types.js";

export const putTodo: RequestHandler = tryCatch(
  async (req: RequestWithUser, res) => {
    const todoToUpdate = req.body as Todo;
    const userId = req.user?.id ?? "";

    console.log(userId, todoToUpdate.authorId);

    if (todoToUpdate.authorId != userId) {
      throw new Error("That todo does not belong to you");
    }

    const newTodo: Todo = {
      ...todoToUpdate,
      createdAt: new Date(todoToUpdate.createdAt),
      updatedAt: new Date(Date.now()),
    };

    todoInsertSchema.parse(newTodo);

    const updatedTodo = await db
      .update(todo)
      .set(newTodo)
      .where(eq(todo.id, todoToUpdate.id))
      .returning();

    res.status(200).send(updatedTodo);
  }
);
