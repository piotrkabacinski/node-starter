import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Todo } from "./entity/Todo";

import ormconfig from "../../ormconfig";

const AppDataSource = new DataSource({
  ...ormconfig,
  entities: [User, Todo],
});

export const getAppDataSourceInstance = async (): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return AppDataSource;

  await AppDataSource.initialize();

  return AppDataSource;
};
