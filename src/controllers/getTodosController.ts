import { Response } from "express";
import { getCustomRepository } from "typeorm";
import { TodosRepository } from "../db/repository/TodoRepository";

export default async function (_, res: Response) {
  res.set("Content-Type", "application/json");

  const todosRepository = getCustomRepository(TodosRepository);

  const todos = await todosRepository.getTodos();

  res.send({
    todos,
  });
}
