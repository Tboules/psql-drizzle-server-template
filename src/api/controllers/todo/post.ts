import { todo, todoInsertSchema, Todo } from "../../../db/schema/todo.js";
import { RequestHandler } from "express";
import { db } from "../../../loaders/drizzleLoader.js";
import tryCatch from "../../../utils/tryCatch.js";
import { RequestWithUser } from "../../../utils/types.js";

export const postTodo: RequestHandler = tryCatch(
  async (req: RequestWithUser, res) => {
    const data = req.body;

    const newTodo: Todo = {
      ...data,
      createdAt: new Date(Date.now()),
      status: "created",
      authorId: req.user?.id,
    };

    todoInsertSchema.parse(newTodo);

    const insertedTodo = await db.insert(todo).values(newTodo).returning();
    res.status(200).send(insertedTodo);
  }
);
