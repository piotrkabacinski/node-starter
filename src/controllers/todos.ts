import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import {
  TodosRepository,
  UpdateTodoRequestBody,
} from "src/db/repository/TodoRepository";
import { StatusCodes } from "http-status-codes";
import { UsersRepository } from "src/db/repository/UserRepository";
import omit from "lodash/omit";
import { Todo } from "src/db/entity/Todo";

const formatTodo = (todo: Todo) => ({
  ...omit(todo, "id"),
  created_at: todo.created_at.toISOString(),
  updated_at: todo.updated_at ? todo.updated_at.toISOString() : undefined,
});

export async function createTodo(req: Request, res: Response) {
  const { userId } = req.params;
  const { description }: { description: string } = req.body;

  const todosRepository = getCustomRepository(TodosRepository);
  const userRepositor = getCustomRepository(UsersRepository);

  try {
    const user = await userRepositor.getUserById(Number(userId));

    const newTodo = await todosRepository.addTodo(user, description);

    const {
      raw: [{ id }],
    } = newTodo;

    const todo = await todosRepository.getTodoById(id);

    res.status(StatusCodes.CREATED);

    res.send(formatTodo(todo));
  } catch (_err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function getTodo(req: Request, res: Response) {
  const { uuid, userId } = req.params;

  const todosRepository = getCustomRepository(TodosRepository);
  const userRepositor = getCustomRepository(UsersRepository);

  const user = await userRepositor.getUserById(Number(userId));
  const todo = await todosRepository.getTodoByUuid(user, uuid);

  if (todo === undefined) {
    res.sendStatus(StatusCodes.NOT_FOUND);
  } else {
    res.send(formatTodo(todo));
  }
}

export async function getTodos(req: Request, res: Response) {
  const { userId } = req.params;

  const todosRepository = getCustomRepository(TodosRepository);
  const userRepositor = getCustomRepository(UsersRepository);

  const user = await userRepositor.getUserById(Number(userId));

  if (user === undefined) {
    res.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }

  const todos = await todosRepository.getUsersTodos(user);

  res.send({
    todos: todos.map((todo) => formatTodo(todo)),
  });
}

export async function deleteTodo(req: Request, res: Response) {
  const { uuid, userId } = req.params;

  const todosRepository = getCustomRepository(TodosRepository);
  const userRepositor = getCustomRepository(UsersRepository);

  const user = await userRepositor.getUserById(Number(userId));
  const todo = await todosRepository.getTodoByUuid(user, uuid);

  if (todo === undefined) {
    res.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }

  await todosRepository.deleteTodo(user, uuid);

  res.sendStatus(StatusCodes.NO_CONTENT);
}

export async function updateTodo(req: Request, res: Response) {
  const { uuid, userId } = req.params;

  const { description, is_done }: UpdateTodoRequestBody = req.body;

  const todosRepository = getCustomRepository(TodosRepository);
  const userRepositor = getCustomRepository(UsersRepository);

  const user = await userRepositor.getUserById(Number(userId));
  const todo = await todosRepository.getTodoByUuid(user, uuid);

  if (todo === undefined) {
    res.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }

  await todosRepository.updateTodo(user, uuid, {
    description,
    is_done,
  });

  const updatedTodo = await todosRepository.getTodoByUuid(user, uuid);

  res.send(formatTodo(updatedTodo));
}
