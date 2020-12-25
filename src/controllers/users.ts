import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../db/repository/UserRepository";
import { StatusCodes } from "http-status-codes";

export async function getUsers(_, res: Response) {
  const usersRepository = getCustomRepository(UsersRepository);

  const users = await usersRepository.getUsers();

  res.send({
    users,
  });
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  const usersRepository = getCustomRepository(UsersRepository);

  const existingUser = await usersRepository.getUserById(id);

  if (existingUser === undefined) {
    res.sendStatus(StatusCodes.NOT_FOUND);
  } else {
    await usersRepository.deleteUser(id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  }
}

export async function createUser(req: Request, res: Response) {
  const usersRepository = getCustomRepository(UsersRepository);
  const { email } = req.body;

  const existingUser = await usersRepository.getUserByEmail(email);

  if (existingUser === undefined) {
    const {
      identifiers: [{ id }],
    } = await usersRepository.createUser(email);
    const user = await usersRepository.getUserById(id);

    res.status(StatusCodes.CREATED);
    res.send(user);
  } else {
    res.sendStatus(StatusCodes.SEE_OTHER);
  }
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  const usersRepository = getCustomRepository(UsersRepository);

  const user = await usersRepository.getUserById(Number(id));

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(StatusCodes.NOT_FOUND);
  }
}
