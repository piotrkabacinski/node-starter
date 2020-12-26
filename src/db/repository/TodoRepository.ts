import { EntityRepository, Repository } from "typeorm";
import { Todo } from "../entity/Todo";
import { User } from "../entity/User";
import { v4 as uuidv4 } from "uuid";

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

  getTodoByUuid(uuid: string) {
    return this.findOne({
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
}
