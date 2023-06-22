import { ilike, or } from "drizzle-orm";
import { RequestHandler } from "express";

import { todo } from "../../../db/schema/todo.js";
import { db } from "../../../loaders/drizzleLoader.js";
import tryCatch from "../../../utils/tryCatch.js";
import { RequestWithUser } from "../../../utils/types.js";

export const getTodos = tryCatch(async (req: RequestWithUser, res) => {
  const todos = await db.select().from(todo);

  console.log(req.user);

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

// export const getUsersTodos = tryCatch(async (req: RequestWithUser, res) => {
//   const todos = await db.select().from(todo);

//   res.status(200).send(todos);
// });
