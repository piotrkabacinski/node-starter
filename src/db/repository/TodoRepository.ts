import { EntityRepository, Repository } from "typeorm";
import { Todo } from "../entity/Todo";
import { User } from "../entity/User";
import { v4 as uuidv4 } from "uuid";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

export type UpdateTodoRequestBody = Partial<
  Pick<Todo, "description" | "is_done">
>;

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {
  addTodo(user: User, description: string) {
    return this.insert({
      user,
      description,
      is_done: false,
      uuid: uuidv4(),
      created_at: new Date(),
    });
  }

  getTodoByUuid(user: User, uuid: string) {
    return this.findOne({
      user,
      uuid,
    });
  }

  getTodoById(id: number) {
    return this.findOne({
      id,
    });
  }

  getUsersTodos(user: User) {
    return this.find({
      user,
    });
  }

  deleteTodo(user: User, uuid: string) {
    return this.delete({
      user,
      uuid,
    });
  }

  deleteTodos(user: User) {
    return this.delete({
      user,
    });
  }

  updateTodo(user: User, uuid: string, body: UpdateTodoRequestBody) {
    return this.update(
      { user, uuid },
      {
        ...omitBy(body, isNil),
        updated_at: new Date(),
      }
    );
  }
}
