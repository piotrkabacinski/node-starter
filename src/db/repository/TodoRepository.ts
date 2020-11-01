import { EntityRepository, Repository } from "typeorm";
import { Todos } from "../entity/Todos";

@EntityRepository(Todos)
export class TodosRepository extends Repository<Todos> {
  getTodos() {
    return this.find();
  }
}
