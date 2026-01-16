import { Request, Response } from "express";
import * as usersRepository from "src/db/repository/UserRepository.js";
import * as todosRepository from "src/db/repository/TodoRepository.js";
import { StatusCodes } from "http-status-codes";
import { User } from "src/db/client/index.js";

const formatUserResponse = (
  user: User,
): Omit<User, "created_at"> & { created_at: string } => {
  return {
    ...user,
    created_at: user.created_at.toISOString(),
  };
};

export async function getUsers(_, res: Response) {
  const users = await usersRepository.getUsers();

  res.send({
    users: users.map((user) => formatUserResponse(user)),
  });
}

export async function deleteUser(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  const existingUser = await usersRepository.getUserById(userId);

  if (!existingUser) {
    res.sendStatus(StatusCodes.NOT_FOUND);
  } else {
    await todosRepository.deleteTodos(existingUser.id);
    await usersRepository.deleteUser(userId);
    res.sendStatus(StatusCodes.NO_CONTENT);
  }
}

export async function createUser(req: Request, res: Response) {
  const { email } = req.body;

  const existingUser = await usersRepository.getUserByEmail(email);

  if (!existingUser) {
    const { id } = await usersRepository.createUser(email);

    const user = await usersRepository.getUserById(id);

    res.status(StatusCodes.CREATED);
    res.send(formatUserResponse(user));
  } else {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
}

export async function getUser(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  const user = await usersRepository.getUserById(userId);

  if (user) {
    res.send(formatUserResponse(user));
  } else {
    res.sendStatus(StatusCodes.NOT_FOUND);
  }
}
