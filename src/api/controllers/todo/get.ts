import { and, eq, ilike, or } from "drizzle-orm";
import { RequestHandler } from "express";

import { todo } from "../../../db/schema/todo.js";
import { db } from "../../../loaders/drizzleLoader.js";
import tryCatch from "../../../utils/tryCatch.js";
import { RequestWithUser } from "../../../utils/types.js";

export const getTodos = tryCatch(async (req: RequestWithUser, res) => {
  const userId = req.user?.id ?? "";

  const todos = await db.select().from(todo).where(eq(todo.authorId, userId));

  res.status(200).send(todos);
});

export const searchTodos: RequestHandler<{ search: string }> = tryCatch(
  async (req: RequestWithUser, res) => {
    const userId = req.user?.id ?? "";
    const { search } = req.params;

    const filteredTodos = await db
      .select()
      .from(todo)
      .where(
        and(
          eq(todo.authorId, userId),
          or(ilike(todo.body, `%${search}%`), ilike(todo.title, `%${search}%`))
        )
      );

    res.status(200).send(filteredTodos);
  }
);
