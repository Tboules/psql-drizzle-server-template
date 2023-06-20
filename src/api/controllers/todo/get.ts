import { ilike, or } from "drizzle-orm";
import { RequestHandler } from "express";

import { db } from "../../../loaders/drizzleLoader.js";
import { todo } from "../../../db/schema/todo.js";
import tryCatch from "../../../utils/tryCatch.js";

export const getTodos: RequestHandler = tryCatch(async (req, res) => {
  const todos = await db.select().from(todo);

  res.status(200).send(todos);
});

export const searchTodos: RequestHandler<{ search: string }> = tryCatch(
  async (req, res) => {
    const { search } = req.params;

    const filteredTodos = await db
      .select()
      .from(todo)
      .where(
        or(ilike(todo.body, `%${search}%`), ilike(todo.title, `%${search}%`))
      );

    res.status(200).send(filteredTodos);
  }
);
