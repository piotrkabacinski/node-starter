import { EntityRepository, Repository } from "typeorm";
import { Todo } from "../entity/Todo";

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {
  addTodo(description: string) {
    return this.insert({
      description,
      isDone: false,
    });
  }

  getTodos() {
    return this.find();
  }

  getTodo(id: number) {
    return this.findOne({
      id,
    });
  }
}
