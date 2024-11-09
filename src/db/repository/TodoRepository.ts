import { v4 as uuidv4 } from "uuid";
import { User, Todo } from "@prisma/client";
import { prismaQuery } from "..";
import { isNil, omitBy } from "lodash";

export type UpdateTodoRequestBody = Partial<
  Pick<Todo, "description" | "is_done">
>;

export const addTodo = async ({
  userId,
  description,
}: {
  userId: User["id"];
  description: Todo["description"];
}) =>
  prismaQuery((client) =>
    client.todo.create({
      data: {
        uuid: uuidv4(),
        created_at: new Date(),
        description,
        is_done: false,
        userId,
      },
    })
  );

export const getTodoByUuid = async ({
  userId,
  uuid,
}: {
  userId: User["id"];
  uuid: Todo["uuid"];
}) =>
  prismaQuery((client) =>
    client.todo.findFirst({
      where: {
        userId,
        uuid,
      },
    })
  );

export const getTodoById = async (id: Todo["id"]) =>
  prismaQuery((client) =>
    client.todo.findFirst({
      where: {
        id,
      },
    })
  );

export const getUsersTodo = async (userId: User["id"], id: Todo["id"]) =>
  prismaQuery((client) =>
    client.todo.findFirst({
      where: {
        id,
        userId,
      },
    })
  );

export const getUsersTodos = async (userId: User["id"]) =>
  prismaQuery((client) =>
    client.todo.findMany({
      where: {
        userId,
      },
    })
  );

export const deleteTodos = async (userId: User["id"]) =>
  prismaQuery((client) =>
    client.todo.deleteMany({
      where: {
        userId,
      },
    })
  );

export const deleteTodo = async ({
  userId,
  uuid,
}: {
  userId: User["id"];
  uuid: Todo["uuid"];
}) =>
  prismaQuery((client) =>
    client.todo.deleteMany({
      where: {
        userId,
        uuid,
      },
    })
  );

export const updateTodo = async ({
  userId,
  uuid,
  body,
}: {
  userId: User["id"];
  uuid: Todo["uuid"];
  body: UpdateTodoRequestBody;
}) =>
  prismaQuery((client) =>
    client.todo.update({
      where: {
        userId,
        uuid,
      },
      data: {
        ...omitBy(body, isNil),
        updated_at: new Date(),
      },
    })
  );
