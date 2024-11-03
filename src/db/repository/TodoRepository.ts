import { Todo } from "src/db/entity/Todo";
import { User } from "src/db/entity/User";
import { v4 as uuidv4 } from "uuid";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import { getAppDataSourceInstance } from "src/db";

export type UpdateTodoRequestBody = Partial<
  Pick<Todo, "description" | "is_done">
>;

const getTodoRepository = async () =>
  (await getAppDataSourceInstance()).getRepository(Todo);

export const addTodo = async (user: User, description: string) => {
  return (await getTodoRepository()).insert({
    user,
    description,
    is_done: false,
    uuid: uuidv4(),
    created_at: new Date(),
  });
};

export const getTodoByUuid = async (user: Todo["user"], uuid: Todo["uuid"]) => {
  return (await getTodoRepository()).findOne({ where: { user, uuid }});
};

export const getTodoById = async (id: Todo["id"]) => {
  return (await getTodoRepository()).findOneBy({
    id,
  });
};

export const getUsersTodo = async (user: Todo["user"], id: Todo["id"]) => {
  return (await getTodoRepository()).findBy({
    id,
    user,
  });
};

export const getUsersTodos = async (user: Todo["user"]) => {
  return (await getTodoRepository()).findBy({
    user,
  });
};

export const deleteTodos = async (user: Todo["user"]) => {
  return (await getTodoRepository()).delete({
    user,
  });
};

export const deleteTodo = async (user: Todo["user"], uuid: Todo["uuid"]) => {
  return (await getTodoRepository()).delete({
    user,
    uuid,
  });
};

export const updateTodo = async (
  user: Todo["user"],
  uuid: Todo["uuid"],
  body: UpdateTodoRequestBody
) => {
  return (await getTodoRepository()).update(
    { user, uuid },
    {
      ...omitBy(body, isNil),
      updated_at: new Date(),
    }
  );
};
