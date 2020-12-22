import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  createUser(email: string) {
    return this.insert({
      email,
    });
  }

  getUsers() {
    return this.find();
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
