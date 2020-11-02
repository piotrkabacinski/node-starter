import { EntityRepository, Repository } from "typeorm";
import { Todos } from "../entity/Todos";

@EntityRepository(Todos)
export class TodosRepository extends Repository<Todos> {
  addTodo() {
    this.insert({
      description: "Hello!",
      isDone: false,
    });
  }

  getTodos() {
    return this.find();
  }
}
