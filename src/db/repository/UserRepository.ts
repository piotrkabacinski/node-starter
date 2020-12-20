import { EntityRepository, Repository } from "typeorm";
import { Users } from "../entity/Users";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  createUser(email: string) {
    return this.insert({
      email,
    });
  }

  getUsers() {
    return this.find()
  }

  getUserByEmail(email: string) {
    return this.findOne({
      email,
    });
  }

  getUserById(id: number) {
    return this.findOne({
      id,
    });
  }
}
