import { todo, todoInsertSchema, Todo } from "../../../db/schema/todo.js";
import { RequestHandler } from "express";
import { db } from "../../../loaders/drizzleLoader.js";
import tryCatch from "../../../utils/tryCatch.js";

export const postTodo: RequestHandler = tryCatch(async (req, res) => {
  const data = req.body;

  const newTodo: Todo = {
    ...data,
    createdAt: new Date(Date.now()),
    status: "created",
  };

  todoInsertSchema.parse(newTodo);

  const insertedTodo = await db.insert(todo).values(newTodo).returning();
  res.status(200).send(insertedTodo);
});
