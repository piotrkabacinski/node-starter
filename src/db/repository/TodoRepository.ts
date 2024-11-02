import { Todo } from "src/db/entity/Todo";
import { User } from "src/db/entity/User";
import { v4 as uuidv4 } from "uuid";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import { AppDataSource } from "src/db";

export type UpdateTodoRequestBody = Partial<
  Pick<Todo, "description" | "is_done">
>;

const todoRepository = AppDataSource.getRepository(Todo);

export const addTodo = (user: User, description: string) => {
  return todoRepository.insert({
    user,
    description,
    is_done: false,
    uuid: uuidv4(),
    created_at: new Date(),
  });
};

export const getTodoByUuid = (user: Todo["user"], uuid: Todo["uuid"]) => {
  return todoRepository.findOneBy({
    user,
    uuid,
  });
};

export const getTodoById = (id: Todo["id"]) => {
  return todoRepository.findOneBy({
    id,
  });
};

export const getUsersTodo = (user: Todo["user"], id: Todo["id"]) => {
  return todoRepository.findBy({
    id,
    user,
  });
};

export const getUsersTodos = (user: Todo["user"]) => {
  return todoRepository.findBy({
    user,
  });
};

export const deleteTodos = (user: Todo["user"]) => {
  return todoRepository.delete({
    user,
  });
};

export const deleteTodo = (user: Todo["user"], uuid: Todo["uuid"]) => {
  return todoRepository.delete({
    user,
    uuid,
  });
};

export const updateTodo = (
  user: Todo["user"],
  uuid: Todo["uuid"],
  body: UpdateTodoRequestBody
) => {
  return todoRepository.update(
    { user, uuid },
    {
      ...omitBy(body, isNil),
      updated_at: new Date(),
    }
  );
};
