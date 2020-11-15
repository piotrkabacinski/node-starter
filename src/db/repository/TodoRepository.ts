import { EntityRepository, Repository } from "typeorm";
import { Todos } from "../entity/Todos";

@EntityRepository(Todos)
export class TodosRepository extends Repository<Todos> {
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
    return this.find({
      id,
    });
  }
}
