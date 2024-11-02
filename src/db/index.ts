import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Todo } from "./entity/Todo";

import ormconfig from "../../ormconfig";

export const AppDataSource = new DataSource({
  ...ormconfig,
  entities: [User, Todo],
});

AppDataSource.initialize().catch((error) => console.log(error));
