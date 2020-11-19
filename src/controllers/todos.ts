import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { TodosRepository } from "../db/repository/TodoRepository";
import { StatusCodes } from 'http-status-codes';

export async function getTodos(_, res: Response) {
  const todosRepository = getCustomRepository(TodosRepository);

  const todos = await todosRepository.getTodos();

  res.send({
    todos,
  });
}

export async function addTodo(req: Request, res: Response) {
  const todosRepository = getCustomRepository(TodosRepository);

  try {
    const { description }: { description: string } = req.body;

    const {
      raw: [{ id }],
    } = await todosRepository.addTodo(description);

    const [todo] = await todosRepository.getTodo(id);

    res.send(todo).status(StatusCodes.OK);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function getTodo(req: Request, res: Response) {
  const todosRepository = getCustomRepository(TodosRepository);
  const { id } = req.params;

  const [todo] = await todosRepository.getTodo(Number(id));

  if (todo) {
    res.send(todo);
  } else {
    res.sendStatus(StatusCodes.NOT_FOUND);
  }
}